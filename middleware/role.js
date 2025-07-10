function checkRole(allowedRoles) {
  return (req, res, next) => {
    const user = req.user; // dolazi iz auth middlewarea

    if (!user) {
      return res.status(401).json({ message: "Nema korisnika" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Zabranjen pristup" });
    }

    next();
  };
}

module.exports = checkRole;
