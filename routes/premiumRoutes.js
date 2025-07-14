const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const checkRole = require("../middleware/role");

router.get("/secret", auth, checkRole(["premium", "admin"]), (req, res) => {
  res.json({ message: "Ovo je sadržaj dostupan samo premium korisnicima." });
});

router.post("/fake-upgrade", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "Korisnik ne postoji" });

    user.role = "premium";
    await user.save();

    res.json({ message: "Uspešno si postao PREMIUM korisnik! 🎉" });
  } catch (err) {
    res.status(500).json({ message: "Greška na serveru" });
  }
});


module.exports = router;
