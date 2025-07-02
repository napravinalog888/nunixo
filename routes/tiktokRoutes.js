const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth } = require("../middleware/authMiddleware");
require("dotenv").config();

const { TIKTOK_CLIENT_ID, TIKTOK_REDIRECT_URI } = process.env;

// KORAK 1: Generiše TikTok login link
router.get("/login", auth, (req, res) => {
  const scope = "user.info.basic";

  const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${TIKTOK_CLIENT_ID}&scope=${scope}&response_type=code&redirect_uri=${encodeURIComponent(
    TIKTOK_REDIRECT_URI
  )}&state=${req.user.id}`;

  res.json({ url });
});

// KORAK 2: Dummy callback
router.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ message: "Nedostaje kod ili state" });
  }

  console.log(`Primljen code: ${code} za user: ${state}`);

  // Dummy upis u bazu (bez stvarnog TikTok tokena)
  await User.findByIdAndUpdate(state, {
    "tiktok.username": "dummy_tiktok_user",
    "tiktok.id": "dummy_id",
  });

  // Preusmerenje na frontend (promeni kad deployuješ)
  res.redirect("http://localhost:3000/");
});

module.exports = router;

