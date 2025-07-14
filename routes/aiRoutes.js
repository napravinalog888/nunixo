// routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const { auth, requirePlan } = require("../middleware/authMiddleware");
const openai = require("../utils/openai");

// 🎯 TEST RUTE ZA PLANOVE
router.get("/test-free", auth, requirePlan(["free", "starter", "pro", "elite", "enterprise"]), (req, res) => {
  res.json({ message: `Zdravo ${req.user.email}, koristiš FREE opciju.` });
});

router.get("/test-pro", auth, requirePlan(["pro", "elite", "enterprise"]), (req, res) => {
  res.json({ message: `Zdravo ${req.user.email}, koristiš PRO opciju.` });
});

// 🧠 AI RUTA ZA GENERISANJE INSTAGRAM OPISA
router.post("/caption", auth, async (req, res) => {
  const { topic, tone } = req.body;

  if (!topic || !tone) {
    return res.status(400).json({ message: "Nedostaje tema ili ton." });
  }

  try {
    const prompt = `Napiši Instagram opis za temu: "${topic}", ton: ${tone}, i predloži 5 hashtagova.`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const response = chatCompletion.choices[0].message.content;

    res.json({ result: response });
  } catch (err) {
    console.error("OpenAI greška:", err.message);
    res.status(500).json({ message: "Greška prilikom generisanja." });
  }
});

module.exports = router;
