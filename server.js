const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use((req, res, next) => { console.log(req.method, req.url); next(); });
app.use(express.static("public"));

const MODELS = [process.env.GEMMA_MODEL || "gemma-4-26b-a4b-it", "gemma-4-31b-it"];

app.get("/api/health", (req, res) => {
  res.json({ ok: true, keyLoaded: Boolean(process.env.GEMINI_API_KEY), models: MODELS });
});

async function askGemma(model, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY
    },
    body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] })
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data?.error?.message || `HTTP ${r.status}`);
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const text = parts.filter(p => !p.thought).map(p => p.text || "").join("").trim();
  if (!text) throw new Error("Empty response from model");
  return text;
}

app.post("/api/explain", async (req, res) => {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Server is missing GEMINI_API_KEY" });
  }
  const s = req.body || {};
  const reps = Number(s.reps);
  if (!Number.isFinite(reps) || reps < 0) {
    return res.status(400).json({ error: "Invalid session data" });
  }

  const prompt = `You are a friendly movement-analysis assistant inside a fitness app.
Below are measurements from a short squat video, analysed with MediaPipe pose estimation.
- Exercise: ${s.exercise || "squat"}
- Repetitions counted: ${reps}
- Deepest squat depth: ${Number(s.deepestDepthPercent) || 0}% (how far the hips dropped relative to body height; 0% = standing)
- Average time per rep: ${s.avgSecondsPerRep ?? "unknown"} seconds
- Video length: ${Number(s.durationSeconds) || 0} seconds

Write a short summary in plain language (maximum 90 words): what the numbers suggest about the session, one encouraging point, and one practical tip.
Rules: use only the numbers above, do not diagnose or give medical advice, and say these are approximate camera-based estimates.`;

  let lastError;
  for (const model of MODELS) {
    try {
      const explanation = await askGemma(model, prompt);
      return res.json({ explanation, model });
    } catch (err) {
      lastError = err;
      console.error(`[${model}] failed:`, err.message);
    }
  }
  res.status(502).json({ error: lastError ? lastError.message : "Gemma request failed" });
});

const PORT = process.env.PORT || 3100;
app.listen(PORT, () =>
  console.log(`HiperMove running on http://localhost:${PORT} | key loaded: ${Boolean(process.env.GEMINI_API_KEY)}`));