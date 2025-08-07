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

// Rute za autentikaciju
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const instagramRoutes = require("./routes/instagramRoutes");
app.use("/api/instagram", instagramRoutes);

const tiktokRoutes = require("./routes/tiktokRoutes");
app.use("/api/tiktok", tiktokRoutes);

const youtubeRoutes = require("./routes/youtubeRoutes");
app.use("/api/youtube", youtubeRoutes);

const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);



//primer - ruta
const premiumRoutes = require("./routes/premiumRoutes");
app.use("/api/premium", premiumRoutes);

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


