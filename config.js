/* SepetTaxi – CONFIG (tek yerden) */
window.SEPETTAXI = {
  // Google Apps Script Web App URL (Deploy > Web app URL)
  API_BASE: "https://script.google.com/macros/s/AKfycbxxvr6OPG5R-emW8WlquzZ1psFEn6Lbvt4dDHpdN8XWO494N7uCv3s4DhLreIhO59b-/exec",

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
