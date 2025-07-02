const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
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

router.post("/change-plan", auth, async (req, res) => {
  const { newPlan } = req.body;

  if (!["free", "starter", "pro", "elit", "premium"].includes(newPlan)) {
    return res.status(400).json({ message: "Nevažeći plan" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Korisnik nije pronađen" });

    user.plan = newPlan;
    await user.save();

    res.json({ message: "Plan uspešno promenjen", plan: user.plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server greška" });
  }
});

module.exports = router;
