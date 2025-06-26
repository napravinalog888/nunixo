// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token nije prisutan" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ message: "Korisnik ne postoji" });

    req.user = user; // korisnik ide u req.user za dalje
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token nije validan" });
  }
};

// Primer provere plana (npr. samo PRO korisnici)
const requirePlan = (planList) => {
  return (req, res, next) => {
    if (!planList.includes(req.user.plan)) {
      return res.status(403).json({ message: "Tvoj plan ne dozvoljava ovu opciju" });
    }
    next();
  };
};

module.exports = {
  auth,
  requirePlan,
};
