<script>
/**
 * SepetTaxi – Global Config (LOCKED)
 * Backend v2.4.4 ile uyumlu
 */

window.SEPT = {
  // === BACKEND ===
  BACKEND_URL: "https://script.google.com/macros/s/AKfycbzzwdIUkPheKBoJS3U13pvrFMi9VutO-M0gM-LRfDnUnrk6JwrBAevMKp9a4Ecy6Dcy/exec",

  // === ECONOMY ===
  COMMISSION: 0.15,

  // === TIMING ===
  POLL_MS: 3000,        // track polling
  DRIVER_PING_MS: 5000, // driver heartbeat (ileride)

  // === ACTION MAP (KİLİTLİ) ===
  ACTIONS: {
    // customer
    CREATE_JOB: "createJob",
    CHECK_JOB: "checkJob",
    GET_LIVE: "getLive",

    // driver
    REGISTER_DRIVER: "registerDriver",
    SET_DRIVER_STATUS: "setDriverStatus",
    HEARTBEAT: "heartbeatDriver",
    UPDATE_LIVE: "updateLive",
    DRIVER_GET_JOB: "driverGetJob",
    START_JOB: "startJob",
    COMPLETE_JOB: "completeJob",
    CANCEL_JOB: "cancelJob",

    // admin
    ADMIN_LIST_JOBS: "adminListJobs",
    ADMIN_LIST_DRIVERS: "adminListDrivers",
    ADMIN_ASSIGN_DRIVER: "adminAssignDriver"
  },

  // === FLAGS ===
  DEBUG: false
};
</script>
