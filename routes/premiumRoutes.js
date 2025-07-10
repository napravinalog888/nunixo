const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");

router.get("/secret", auth, checkRole(["premium", "admin"]), (req, res) => {
  res.json({ message: "Ovo je sadržaj dostupan samo premium korisnicima." });
});

module.exports = router;
