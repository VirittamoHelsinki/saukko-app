// Import required modules and libraries
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require('../utils/config')
const { sendResetPasswordEmail,sendVerificationEmail } = require('../mailer');

// Register a new user
userRouter.post("/", async (req, res) => {

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

  User.addProperties(body.role) // add unique properties to the user object based on the role

  try {
    // Create a new user object, with the provided name, email, password and role
    let newUserObject = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      role: body.role
    }

    if (newUserObject.role === "customer") { // add customer's unique properties from the body to the user object

    } 

    if (newUserObject.role === "teacher") { // add teacher's unique properties from the body to the user object
      
    } 

    if (newUserObject.role === "supervisor") { // add supervisor's unique properties from the body to the user object
      
    } 

    if (newUserObject.role === "admin") { // add admin's unique properties from the body to the user object
      
    } 

    const newUser = new User(newUserObject);

    // set password to the user object
    await newUser.setPassword(body.password)

    // save the user object to the database
    await newUser.save()
  

    if(newUser.role !== 'supervisor') {
      const verificationToken = newUser.generateEmailVerificationToken();
      const verificationLink = `https://saukko.azurewebsites.net/verify-email/${verificationToken}`;

      // Send verification email
      sendVerificationEmail(newUser, verificationLink);
      console.log('user created and verification email sent');
    } else {
      console.log('user created without verification email (role: supervisor)');
    }
    res.status(201).json({ userId: newUser._id, message: "User created. Verification email sent." });

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//forgot-password
userRouter.post("/forgot-password", async (req, res) => {

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
    return res.json({ message: "Password reset link sent to email" });
  }

  try {
    sendResetPasswordEmail(existUser)
    res.status(200).json({ message: "Password reset link sent to email" })
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ errorMessage: err.message })
  }

})
// validate token function
userRouter.post("/validate-token", async (req, res) => {
  jwt.verify(req.body.token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err.message)
      return res.status(401).json({ errorMessage: "Invalid token" })
    }
    res.status(200).json({ message: "Token is valid" })
  })
})

// reset-password
userRouter.post("/reset-password", (req, res) => {

  // Retrieve the token from the request body
  const token = req.body.token || null
  
  // Retrieve the new password from the request body
  const newPassword = req.body.newPassword || null
  
  // check if the token is null, return with an error message
  if (token === null) {
    console.log("no token")
    return res.status(400).json({ errorMessage: "No token" })
  }

  // check if the new password is null, return with an error message
  if (newPassword === null) {
    console.log("password required")
    return res.status(400).json({ errorMessage: "password required" })
  }

  // validate the token
  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Invalid token:",err.message)
      return res.status(401).json({ errorMessage: "Invalid token" })
    }

    // check if the user exists by using the decoded id
    User.findById(decoded.id).then(exitsUser => {

      // if the user does not exist, return with an error message
      if (!exitsUser) {
        console.log("user does not exist")
        return res.status(401).json({ errorMessage: "User does not exist" })
      }

      // set the new password and save the user object
      try {
        exitsUser.setPassword(newPassword)
        exitsUser.save()
        console.log("password reset successful")
        return res.status(200).json({ message: "Password reset successful" })
      } catch (err) {
        console.log("password reset failed:", err.message)
        return res.status(400).json({ errorMessage: "Password reset failed" })
      }
    })
  })
})

// login
userRouter.post("/login", async (req, res) => {
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
    const token = await existingUser.generateJWT()

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
userRouter.get("/loggedIn", (req, res) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.token;
    if (!token) {
      console.log("token unverified")
      return res.json({ loggedIn: false });
    }

    // Verify the token using the JWT_SECRET
    const validateUser = jwt.verify(token, config.JWT_SECRET);

    console.log("token verified")

    // If the token is valid, respond with loggedIn:true and the decoded user information
    res.json({ loggedIn: true, user: validateUser });
  } catch (err) {
    console.error(err.message);
    // If there is an error, respond with loggedIn:false
    res.json({ loggedIn: false });
  }
});

// logout
userRouter.get("/logout", (req, res) => {
  // Clear the token cookie
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  }).send(console.log("Logged out"));
});

// verify-email
userRouter.get('/verify-email/:token', async (req, res) => {
  console.log('Verify email endpoint hit with token:', req.params.token);
    try {
    const { token } = req.params;
    const decoded = jwt.verify(token, config.JWT_SECRET)
    const user = await User.findById(decoded.id);

    if (!user) {
      console.error("User not found with ID:", decoded.id);
      return res.status(400).json({ errorMessage: 'User not found' });
    }

    user.emailVerified = true;
    await user.save();

    // Redirect user to the reset-password page
    return res.redirect(`https://saukko.azurewebsites.net/reset-password/${token}`);
  } catch (err) {
    console.error("Error in email verification:", err);
    return res.status(500).json({ errorMessage: 'Error verifying email' });
  }
});


module.exports = userRouter
