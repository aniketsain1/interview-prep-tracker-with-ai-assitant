import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

/* ================= CORS ================= */

app.use(cors({ origin: true }));

app.use(express.json());

/* ================= ENV CHECK ================= */

if (!process.env.OPENROUTER_API_KEY) {
  console.error("❌ Missing OPENROUTER_API_KEY in .env");
  process.exit(1);
}

/* ================= CLIENT ================= */

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

/* ================= ROUTES ================= */

app.get("/", (req, res) => {
  console.log("🌐 Health check hit");
  res.send("Backend is working ✅");
});

app.post("/api/ai", async (req, res) => {
  try {
    console.log("📥 Request:", req.body);

    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Valid prompt required" });
    }

    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert interview preparation assistant. Give structured answers with examples and interview questions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = response?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("❌ Empty AI response:", response);
      return res.status(500).json({ error: "Empty AI response" });
    }

    console.log("🤖 AI:", reply);

    res.json({ reply });

  } catch (err) {
    console.error("🔥 ERROR:", err);

    res.status(500).json({
      error: "AI failed",
      details: err.message,
    });
  }
});

/* ================= SERVER ================= */

app.listen(5001, () => {
  console.log("🚀 Server running on http://localhost:5001");
});