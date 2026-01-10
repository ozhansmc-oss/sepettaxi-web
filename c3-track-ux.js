(function () {
  if (!location.pathname.endsWith("track.html")) return;

  const params = new URLSearchParams(location.search);
  const jobId = params.get("job_id");
  if (!jobId) return;

  const startedAt =
    Number(localStorage.getItem("st_job_started_at")) || Date.now();

  /* ================= STYLES ================= */
  const css = `
  .c3-toast{
    position:fixed;left:50%;bottom:22px;transform:translateX(-50%);
    z-index:9999;
    background:rgba(16,16,18,.88);
    border:1px solid rgba(255,255,255,.14);
    backdrop-filter:blur(10px);
    border-radius:999px;
    padding:10px 14px;
    color:#fff;
    font-size:12px;
    font-weight:800;
    opacity:0;
    transition:opacity .25s ease;
    pointer-events:none;
    box-shadow:0 16px 40px rgba(0,0,0,.55);
  }
  .c3-toast.show{opacity:1}

  .c3-assigned{
    position:fixed;inset:0;z-index:9998;
    display:flex;align-items:center;justify-content:center;
    background:rgba(0,0,0,.45);
    backdrop-filter:blur(8px);
  }
  .c3-assigned-card{
    background:rgba(18,18,20,.92);
    border:1px solid rgba(255,255,255,.14);
    border-radius:26px;
    padding:18px 20px;
    color:#fff;
    text-align:center;
    box-shadow:0 20px 60px rgba(0,0,0,.6);
    animation:c3pop .35s ease;
  }
  @keyframes c3pop{
    from{transform:scale(.92);opacity:.0}
    to{transform:scale(1);opacity:1}
  }
  .c3-assigned-title{font-size:18px;font-weight:1000}
  .c3-assigned-sub{font-size:13px;color:rgba(255,255,255,.65);margin-top:6px}

  .c3-eta{
    position:fixed;top:86px;left:50%;transform:translateX(-50%);
    z-index:9997;
    background:rgba(16,16,18,.82);
    border:1px solid rgba(255,255,255,.14);
    border-radius:999px;
    padding:8px 12px;
    font-size:12px;font-weight:900;
    color:#fff;
    backdrop-filter:blur(10px);
  }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ================= TOAST ================= */
  const toast = document.createElement("div");
  toast.className = "c3-toast";
  document.body.appendChild(toast);

  function showToast(text, ms = 1400) {
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), ms);
  }

  /* ================= TEXT EVOLUTION ================= */
  function evolvingToast() {
    const sec = Math.floor((Date.now() - startedAt) / 1000);
    if (sec < 15) showToast("Yakındaki sürücüler aranıyor");
    else if (sec < 35) showToast("En uygun sürücü eşleştiriliyor");
    else showToast("Yoğunluk kontrol ediliyor");
  }

  const evoTimer = setInterval(evolvingToast, 25000);
  evolvingToast();

  /* ================= ASSIGNED DETECT ================= */
  let assignedShown = false;

  function checkAssigned() {
    // Basit ama güvenli sinyal:
    // Driver marker sayısı artınca "assigned" varsayımı
    const markers = document.querySelectorAll(
      "[class*='leaflet-marker-icon']"
    );
    if (markers.length > 1 && !assignedShown) {
      assignedShown = true;
      showAssigned();
      cleanupSearchingUX();
    }
  }

  function showAssigned() {
    const wrap = document.createElement("div");
    wrap.className = "c3-assigned";
    wrap.innerHTML = `
      <div class="c3-assigned-card">
        <div class="c3-assigned-title">Sürücü bulundu</div>
        <div class="c3-assigned-sub">Canlı takip başlatıldı</div>
      </div>
    `;
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 1800);
  }

  /* ================= ETA (APPROX) ================= */
  const etaBox = document.createElement("div");
  etaBox.className = "c3-eta";
  etaBox.style.display = "none";
  document.body.appendChild(etaBox);

  function updateETA() {
    // ETA tamamen istemci tarafı – iddiasız
    // Marker sayısı >1 ise hesap göster
    const markers = document.querySelectorAll(
      "[class*='leaflet-marker-icon']"
    );
    if (markers.length > 1) {
      // Basit yaklaşım: 30 km/s şehir içi varsayımı
      // Mesafe track.html’de zaten hesaplıysa onu kullanır,
      // yoksa bu sadece “yaklaşık” hissidir
      etaBox.textContent = "≈ birkaç dk";
      etaBox.style.display = "block";
    }
  }

  /* ================= CLEANUP ================= */
  function cleanupSearchingUX() {
    clearInterval(evoTimer);
  }

  /* ================= OBSERVERS ================= */
  const obs = new MutationObserver(() => {
    checkAssigned();
    updateETA();
  });

  obs.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
