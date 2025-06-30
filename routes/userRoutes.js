const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// Dohvati info o korisniku
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Korisnik nije pronađen" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server greška" });
  }
});

module.exports = router;
