const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    // validation
    if (!email || !password || !passwordVerify)
      return res.status(400).json({ errorMessage: "Empty Field" });
    console.log("User already exists");

    if (password.length < 6)
      return res.status(400).json({ errorMessage: "Password must be longer" });
    console.log("User already exists");

    if (password !== passwordVerify)
      return res.status(400).json({ errorMessage: "Passwords not matching " });
    console.log("User already exists");

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ errorMessage: "User already exists" });
    console.log("User already exists");

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user to database
    const newUser = new User({
      email: email,
      passwordHash: passwordHash,
    });

    const savedUser = await newUser.save();

    // creating the token
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send token via HTTP-only cookie
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ errorMessage: "Empty Field" });

    const existingUser = await User.findOne({ email: email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email/password" });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Incorrect password" });

    // creating the token
    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send token via HTTP-only cookie
    res
      .cookie("token", token, { httpOnly: true })
      .send(console.log("Logged in"));
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

// logout
router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send(console.log("Logged out"));
});

module.exports = router;
