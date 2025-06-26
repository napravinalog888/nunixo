// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registracija korisnika
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const postoji = await User.findOne({ email });
    if (postoji) {
      return res.status(400).json({ message: "Korisnik već postoji" });
    }

    const hash = await bcrypt.hash(password, 10);

    const noviKorisnik = new User({ email, password: hash });
    await noviKorisnik.save();

    res.status(201).json({ message: "Registracija uspešna" });
  } catch (err) {
    res.status(500).json({ message: "Greška pri registraciji" });
  }
};

// Login korisnika
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const korisnik = await User.findOne({ email });
    if (!korisnik) {
      return res.status(400).json({ message: "Ne postoji nalog sa ovim emailom" });
    }

    const poklapanje = await bcrypt.compare(password, korisnik.password);
    if (!poklapanje) {
      return res.status(400).json({ message: "Pogrešna lozinka" });
    }

    const token = jwt.sign({ id: korisnik._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: korisnik._id,
        email: korisnik.email,
        plan: korisnik.plan,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Greška pri prijavi" });
  }
};
