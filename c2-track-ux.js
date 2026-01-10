(function () {
  if (!location.pathname.endsWith("track.html")) return;

  const jobId = new URLSearchParams(location.search).get("job_id");
  if (!jobId) return;

  const startedAt =
    Number(localStorage.getItem("st_job_started_at")) || Date.now();

  /* ====== STYLES ====== */
  const css = `
  .c2-overlay{
    position:fixed; inset:0; z-index:9999;
    pointer-events:none;
    display:flex; align-items:flex-end; justify-content:center;
  }
  .c2-card{
    margin-bottom:24px;
    background:rgba(15,15,18,.88);
    backdrop-filter:blur(12px);
    border:1px solid rgba(255,255,255,.12);
    border-radius:22px;
    padding:14px 18px;
    color:#fff;
    box-shadow:0 20px 60px rgba(0,0,0,.6);
    text-align:center;
    min-width:260px;
  }
  .c2-title{font-weight:900;font-size:14px}
  .c2-sub{font-size:12px;color:rgba(255,255,255,.65);margin-top:4px}

  .c2-radar{
    position:fixed; inset:0;
    display:flex; align-items:center; justify-content:center;
    pointer-events:none; z-index:9998;
  }
  .c2-ring{
    width:160px;height:160px;border-radius:50%;
    border:2px solid rgba(245,196,0,.35);
    animation:c2pulse 2s ease-out infinite;
  }
  @keyframes c2pulse{
    0%{transform:scale(.4);opacity:.0}
    30%{opacity:.6}
    100%{transform:scale(1.2);opacity:0}
  }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ====== ELEMENTS ====== */
  const overlay = document.createElement("div");
  overlay.className = "c2-overlay";
  overlay.innerHTML = `
    <div class="c2-card">
      <div class="c2-title" id="c2Title">Sürücü aranıyor</div>
      <div class="c2-sub" id="c2Sub">Yakındaki sürücüler kontrol ediliyor</div>
    </div>
  `;

  const radar = document.createElement("div");
  radar.className = "c2-radar";
  radar.innerHTML = `<div class="c2-ring"></div>`;

  document.body.appendChild(radar);
  document.body.appendChild(overlay);

  /* ====== TEXT EVOLUTION ====== */
  const title = overlay.querySelector("#c2Title");
  const sub = overlay.querySelector("#c2Sub");

  function updateText() {
    const sec = Math.floor((Date.now() - startedAt) / 1000);

    if (sec < 15) {
      title.textContent = "Sürücü aranıyor";
      sub.textContent = "Yakındaki sürücüler kontrol ediliyor";
    } else if (sec < 35) {
      title.textContent = "Eşleşme yapılıyor";
      sub.textContent = "En uygun sürücü hesaplanıyor";
    } else {
      title.textContent = "Yoğunluk var";
      sub.textContent = "Biraz daha sürebilir";
    }
  }

  updateText();
  const timer = setInterval(updateText, 3000);

  /* ====== AUTO SHUTDOWN ====== */
  const stopIfDriverFound = setInterval(() => {
    const markers = document.querySelectorAll(
      "[class*='leaflet-marker-icon']"
    );
    if (markers.length > 1) {
      cleanup();
    }
  }, 2000);

  function cleanup() {
    clearInterval(timer);
    clearInterval(stopIfDriverFound);
    overlay.remove();
    radar.remove();
  }
})();
