// routes/tiktokRoutes.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const { TIKTOK_CLIENT_ID, TIKTOK_CLIENT_SECRET, TIKTOK_REDIRECT_URI } = process.env;

// Korak 1: Redirect ka TikToku (OAuth login)
router.get("/login", (req, res) => {
  const { userId } = req.query; // Uzimamo userId iz query-ja
  const scope = "user.info.basic";

  const redirectUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${TIKTOK_CLIENT_ID}&scope=${scope}&response_type=code&redirect_uri=${encodeURIComponent(TIKTOK_REDIRECT_URI)}&state=${userId}`;

  res.redirect(redirectUrl);
});


// Korak 2: Callback nakon logina (TikTok šalje code)
router.get("/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Razmena code za access_token
    const tokenRes = await axios.post("https://open.tiktokapis.com/v2/oauth/token", {
      client_key: TIKTOK_CLIENT_ID,
      client_secret: TIKTOK_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: TIKTOK_REDIRECT_URI,
    });

    const accessToken = tokenRes.data.access_token;

    // Povlačenje osnovnih podataka korisnika
    const userRes = await axios.get("https://open.tiktokapis.com/v2/user/info/", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userRes.data.data.user;

    // Ovde ćeš ubuduće čuvati korisnika u bazi (ako postoji, ažurirati)
    const User = require("../models/User");

    // Ovde dodaj ID korisnika iz tvoje JWT sesije (ili koristi sesiju)
    const loggedInUserId = req.query.state || null; // naknadno možeš ovo rešiti preko tokena

    if (loggedInUserId) {
      await User.findByIdAndUpdate(loggedInUserId, {
        tiktok: {
          id: user.open_id,
          username: user.username,
          displayName: user.display_name,
          avatar: user.avatar_url,
        },
      });
    }


    res.send(`Zdravo ${user.display_name || user.username}, TikTok je povezan!`);
  } catch (err) {
    console.error("TikTok greška:", err.response?.data || err.message);
    res.status(500).send("Greška pri povezivanju TikTok naloga");
  }
});

module.exports = router;
