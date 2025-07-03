const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth } = require("../middleware/authMiddleware");
require("dotenv").config();

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI;

router.get("/login", auth, (req, res) => {
  const scope = "https://www.googleapis.com/auth/youtube.readonly";
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&state=${req.user.id}`;

  res.json({ url });
});

router.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ message: "Nedostaje kod ili state" });
  }

  console.log(`Primljen YT code: ${code} za user: ${state}`);

  // Dummy upis
  await User.findByIdAndUpdate(state, {
    "youtube.title": "dummy_youtube_channel",
    "youtube.id": "dummy_youtube_id",
  });

  res.redirect("http://localhost:3000/");
});

module.exports = router;
