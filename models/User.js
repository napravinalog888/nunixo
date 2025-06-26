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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
