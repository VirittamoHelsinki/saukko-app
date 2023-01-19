const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);

const mongodb =
  "mongodb+srv://Zabi:Saukko@cluster0.l8cr0jo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongodb, () => {
  console.log("Database connected");
});

// Register
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "Error", error: "Duplicate email" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "Error", user: false });
  }
});

//
// app.get("/api/quote", async (req, res) => {
//   const token = req.headers["x-access-token"];

//   try {
//     const decoded = jwt.verify(token, "secret123");
//     const email = decoded.email;
//     const user = await User.findOne({ email: email });

//     return res.json({ status: "ok", quote: user.quote });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "Error", error: "Invalid token" });
//   }
// });

// // Creating quotes...
// app.post("/api/quote", async (req, res) => {
//   const token = req.headers["x-access-token"];

//   try {
//     const decoded = jwt.verify(token, "secret123");
//     const email = decoded.email;
//     await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

//     return res.json({ status: "ok" });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "Error", error: "Invalid token" });
//   }
// });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
