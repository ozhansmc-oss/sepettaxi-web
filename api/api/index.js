export default async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxxvr6OPG5R-emW8WlquzZ1psFEn6Lbvt4dDHpdN8XWO494N7uCv3s4DhLreIhO59b-/exec";

  try {
    let body = null;

    if (req.method === "POST") {
      body = JSON.stringify(req.body || {});
    }

    const r = await fetch(GAS_URL, {
      method: req.method,
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body
    });

    const text = await r.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(text);

  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
