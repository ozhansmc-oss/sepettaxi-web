(function (w) {
  function log(tag, data) {
    console.log("[SepetTaxi]", tag, data ?? "");
  }

  function warn(tag, data) {
    console.warn("[SepetTaxi]", tag, data ?? "");
  }

  function error(tag, err) {
    console.error("[SepetTaxi]", tag, err);
  }

  w.STLog = { log, warn, error };
})(window);
