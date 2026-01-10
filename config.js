/* SepetTaxi – CONFIG (tek yerden) */
window.SEPETTAXI = {
  // Google Apps Script Web App URL (Deploy > Web app URL)
  API_BASE: "PASTE_YOUR_GAS_WEBAPP_URL_HERE",

  BRAND: {
    name: "SepetTaxi",
    accent: "#f5c400"
  },

  PRICING: {
    // Basit MVP: km başı + açılış
    taxi_open: 45,
    taxi_per_km: 18,
    courier_open: 55,
    courier_per_km: 20
  },

  DRIVER: {
    heartbeat_sec: 8,
    default_radius_km: 5
  },

  ADMIN: {
    // Admin PIN backend’de kontrol edilir; burada sadece UI hint
    pin_length: 4
  }
};
