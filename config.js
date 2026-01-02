<script>
/**
 * SepetTaxi – Global Config (LOCKED) v3.3
 */
window.SEPT = {
  BACKEND_URL: "https://script.google.com/macros/s/AKfycbzTe03o0iBuNcXI2EwWWrCwbhUOMWKqm84izCod51H7yqo679U9pH0rujL1PpxEYehfhg/exec",
  COMMISSION: { taxi: 0.12, courier: 0.15 },
  POLL_MS: 3000,
  ACTIONS: {
    // customer
    CREATE_JOB: "createJob",
    GET_JOB: "getJob",
    UPDATE_LOCATION: "updateLocation",
    UPDATE_STATUS: "updateStatus",

    // driver
    GET_OPEN_JOB: "getOpenJob",
    ASSIGN_JOB: "assignJob",
    UPSERT_DRIVER: "upsertDriver",

    // admin
    ADMIN_AUTH: "adminAuth",
    ADMIN_CHECK: "adminCheck",
    LIST_JOBS: "listJobs",
    LIST_DRIVERS: "listDrivers",
    GET_FINANCE: "getFinance"
  },
  DEBUG: false
};
</script>
