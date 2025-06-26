// routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const { auth, requirePlan } = require("../middleware/authMiddleware");

router.get("/test-free", auth, requirePlan(["free", "starter", "pro", "elite", "enterprise"]), (req, res) => {
  res.json({ message: `Zdravo ${req.user.email}, koristiš FREE opciju.` });
});

router.get("/test-pro", auth, requirePlan(["pro", "elite", "enterprise"]), (req, res) => {
  res.json({ message: `Zdravo ${req.user.email}, koristiš PRO opciju.` });
});

module.exports = router;
