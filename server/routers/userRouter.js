// Import required modules and libraries
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require('../utils/config')
// const { sendResetPasswordEmail } = require('../mailer'); This is for password reset, making it later

// Register a new user
router.post("/", async (req, res) => {

  // Retrieve the request body
  const body = req.body;

  // Validation checks if any of the required fields are empty
  if (!body.email || !body.password) {
    console.log("email or password empty")
    return res.status(400).json({ errorMessage: "Empty Field" });
  }

  // Check if the password is shorter than 6 characters
  if (body.password.length < 6) {
    console.log("password too short")
    return res.status(400).json({ errorMessage: "Password must be longer" });
  }

  // Check if there is an existing user with the same email address
  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    console.log("user already exists")
    return res.status(400).json({ errorMessage: "User already exists" });
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(body.password, salt);

  try {
    // Create a new user object, with the provided name, email, password and role
    const newUser = new User({
      name: body.name,
      email: body.email,
      passwordHash: passwordHash,
      role: body.role,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Create a token for the user
    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      config.JWT_SECRET,
    );
    
    console.log('user created')

    // send token via HTTP-only cookie
    res.status(201).cookie("token", token, { httpOnly: true }).send();

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//forgot-password
router.post("/forgot-password", async (req, res) => {
  
  // Retrieve the email from the request body
  const { email } = req.body;

  // Check if the email field is empty
  if (!email) {
    console.log("email empty")
    return res.status(400).json({ errorMessage: "Empty Field" });
  }

  // Check if there is an existing user with the provided email address
  const existUser = await User.findOne({ email: email });

  // If there is no user with the provided email address, return with no error message
  if (!existUser) {
    console.log("user's email does not exist")
    return res.json({ errorMessage: "" });
  }

  // Create a token for the user
  const newPasswordToken = jwt.sign(
    {
      _id: existUser._id,
    },
    config.JWT_SECRET,
    { expiresIn: 30 * 60 } // url expires in 15 minutes
  );
  
  try {
    // sendResetPasswordEmail(existUser) This is for password reset, making it later
    res.status(200).json({ message: "Password reset link sent to email" })
  } catch (err) {
    console.log(err.message)
    res.status(400).send();
  }

})

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email or password fields are empty
    if (!email || !password) {
      console.log("email or password empty")
      return res.status(400).json({ errorMessage: "Empty Field" });
    }
    
    // Check if user with the provided email exists
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      console.log("user does not exist")
      return res.status(401).json({ errorMessage: "Wrong email/password" });
    }

    // Check if the provided password matches the hashed password stored in the database
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      console.log("incorrect password")
      return res.status(401).json({ errorMessage: "Incorrect password" });
    }

    // Create a token for the user, with the user id, name and role
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
      },
      config.JWT_SECRET,
      { expiresIn: 5 * 60 } // token expires in 5 minutes
    );

    // Send token via HTTP-only cookie
    res.cookie("token", token, { httpOnly: true }).send(
      console.log("Logged in")
    );
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Checks if user is logged in
router.get("/loggedIn", (req, res) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.token;
    if (!token) {
      console.log("no token")
      return res.json({ loggedIn: false });
    }

    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, config.JWT_SECRET);

    console.log("token verified")

    // If the token is valid, respond with loggedIn:true and the decoded user information
    res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    console.error(err.message);
    // If there is an error, respond with loggedIn:false
    res.json({ loggedIn: false });
  }
});

// logout
router.get("/logout", (req, res) => {
  // Clear the token cookie
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  }).send(console.log("Logged out"));
});

module.exports = router
