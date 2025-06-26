// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Učitavanje .env fajla
dotenv.config();

// Kreiranje Express aplikacije
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const path = require('path');

const tiktokRoutes = require("./routes/tiktokRoutes");
app.use("/api/tiktok", tiktokRoutes);


// Rute za autentikaciju
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);

// Test ruta (za proveru da server radi)
app.get("/", (req, res) => {
  res.send("Server radi!");
});

// Povezivanje sa MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB konekcija uspešna");
  } catch (err) {
    console.error("❌ Greška pri povezivanju sa MongoDB:", err.message);
    process.exit(1);
  }
};

// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server pokrenut na http://localhost:${PORT}`);
});


