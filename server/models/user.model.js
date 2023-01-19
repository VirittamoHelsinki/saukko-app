const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    quote: { type: String },
  },
  { collection: "Saukko-users" }
);

const model = mongoose.model("Saukko-users", User);

module.exports = model;
