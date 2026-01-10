export default async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxxvr6OPG5R-emW8WlquzZ1psFEn6Lbvt4dDHpdN8XWO494N7uCv3s4DhLreIhO59b-/exec";

  // CORS (opsiyonel ama iyi)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // GET ping
  if (req.method === "GET") {
    if (req.query?.action === "ping") {
      return res.status(200).json({ ok: true, ts: new Date().toISOString() });
    }
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // POST -> GAS proxy
  if (req.method === "POST") {
    try {
      const r = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(req.body || {})
      });

      const text = await r.text();
      res.setHeader("Content-Type", "application/json");
      return res.status(200).send(text);
    } catch (e) {
      return res.status(500).json({ ok: false, error: String(e) });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
