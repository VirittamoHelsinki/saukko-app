const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    // quote: { type: String },
  },
  { collection: "saukko-users" }
);

const model = mongoose.model("saukko-users", userSchema);

module.exports = model;
