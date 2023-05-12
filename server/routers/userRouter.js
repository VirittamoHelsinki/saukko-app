// Import required modules and libraries
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Register a new user
router.post("/", async (req, res) => {
    try {
        const { email, password, passwordVerify } = req.body;

        // Validation checks if any of the required fields are empty
        if (!email || !password || !passwordVerify)
            return res.status(400).json({ errorMessage: "Empty Field" });
        console.log("User already exists");

        // Check if the password is shorter than 6 characters
        if (password.length < 6)
            return res
                .status(400)
                .json({ errorMessage: "Password must be longer" });
        console.log("User already exists");

        // Check if the passwords do not match
        if (password !== passwordVerify)
            return res
                .status(400)
                .json({ errorMessage: "Passwords not matching " });
        console.log("User already exists");

        // Check if there is an existing user with the same email address
        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res
                .status(400)
                .json({ errorMessage: "User already exists" });
        console.log("User already exists");

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new User({
            email: email,
            passwordHash: passwordHash,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Create a token for the user
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

        // Check if email or password fields are empty
        if (!email || !password)
            return res.status(400).json({ errorMessage: "Empty Field" });
        console.log("Empty Field");

        // Check if user with the provided email exists
        const existingUser = await User.findOne({ email: email });
        if (!existingUser)
            return res
                .status(401)
                .json({ errorMessage: "Wrong email/password" });
        console.log("Wrong email/password");

        // Check if the provided password matches the hashed password stored in the database
        const passwordCorrect = await bcrypt.compare(
            password,
            existingUser.passwordHash
        );

        if (!passwordCorrect)
            return res.status(401).json({ errorMessage: "Incorrect password" });

        // Create a token for the user
        const token = jwt.sign(
            {
                user: existingUser._id,
            },
            process.env.JWT_SECRET
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
        if (!token) return res.json({ loggedIn: false });

        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If the token is valid, respond with loggedIn:true and the decoded user information
        res.json({ loggedIn: true, user: decoded });
    } catch (err) {
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

module.exports = router;
