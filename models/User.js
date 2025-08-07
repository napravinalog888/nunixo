// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ["free", "starter", "pro", "elite", "enterprise"],
      default: "free",
    },


    tiktok: {
  id: { type: String },
  username: { type: String },
  displayName: { type: String },
  avatar: { type: String },
},
role: {
    type: String,
    enum: ["user", "premium", "admin"],
    default: "user",
  }
  },
  { timestamps: true }
);





const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  plan: { type: String, enum: ["free", "starter", "pro", "elite", "premium"], default: "free" },
  
  tiktok: {
    id: String,
    username: String,
    displayName: String,
    avatar: String,
  },
  instagram: {
    id: String,
    username: String,
  },
  youtube: {
    id: String,
    channelId: String,
    title: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
