const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
require("dotenv").config();

const CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID;
const REDIRECT_URI = process.env.INSTAGRAM_REDIRECT_URI;

router.get("/login", auth, (req, res) => {
  const scope = "user_profile";
  const url = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${scope}&response_type=code&state=${req.user.id}`;

  res.json({ url });
});

router.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ message: "Nedostaje kod ili state" });
  }

  console.log(`Primljen IG code: ${code} za user: ${state}`);

  await User.findByIdAndUpdate(state, {
    "instagram.username": "dummy_ig_user",
    "instagram.id": "dummy_ig_id",
  });

  res.redirect("http://localhost:3000/");
});

module.exports = router;

