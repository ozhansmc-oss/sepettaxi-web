/**
 * SepetTaxi – log.js (LOCKED)
 * Minimal, production-safe logger
 */
(function () {
  if (!window.SEPT) {
    console.warn("[SepetTaxi] SEPT config bulunamadı");
    return;
  }

  const DEBUG = !!SEPT.DEBUG;
  const PREFIX = "[SepetTaxi]";

  function now() {
    return new Date().toISOString();
  }

  function fmt(level, msg, data) {
    return { time: now(), level, msg, data: data !== undefined ? data : null };
  }

  function out(method, payload) {
    if (!DEBUG) return;
    try { console[method](PREFIX, payload); } catch (_) {}
  }

  window.Log = {
    info(msg, data) { out("log", fmt("INFO", msg, data)); },
    warn(msg, data) { out("warn", fmt("WARN", msg, data)); },
    error(msg, err) { out("error", fmt("ERROR", msg, err)); },
    api(action, payload, response) {
      out("log", { time: now(), type: "API", action, payload, response });
    }
  };
})();
