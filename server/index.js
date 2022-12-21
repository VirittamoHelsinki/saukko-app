const express = require("express");
<<<<<<< HEAD
const index = express();

index.get("/", (req, res) => {
  res.send("...");
});

index.listen(3001, () => {
  console.log("Server running on port 3001");
=======
const mongoose = require("mongoose");
const cors = require("cors");
const userSchema = require("./models/user.model");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);

const mongodb =
  "mongodb+srv://Zabi:Saukko@cluster0.l8cr0jo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongodb, () => {
  console.log("Database connected");
});

/*// require database connection
const dbConnect = require("./db/dbConnect");

// execute database connection
dbConnect();*/

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await userSchema.create({
      // name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "Error", error: "User already exists" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await userSchema.findOne({
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

app.listen(3000, () => {
  console.log(`Servers running on port 3000`);
>>>>>>> 2bd361f717df2770e986ba7290eafa315f274efe
});
