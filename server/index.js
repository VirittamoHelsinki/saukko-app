// Import required modules and libraries
const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Import the user router
const userRouter = require("./routers/userRouter");

// Import the edu router for fetching ePerusteet
const eduRouter = require("./routers/eduRouter");

// Import the User model and JWT library (not used here...)
/* const User = require("./models/userModel");
const jwt = require("jsonwebtoken"); */

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies
app.use(
    cors({
        // Set the allowed origin for CORS, import from config.js
        origin: [config.ALLOWED_ORIGINS],
        credentials: true, // Enable sending cookies in CORS requests
    })
);

// Connect to the database
mongoose.set("strictQuery", true);
mongoose.connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected!");
    })
    .catch((error) => {
        console.log("Unable to connect database", error.message);
    });

// Set up routes for authentication
app.use('/auth', userRouter);

// Set up routes for ePerusteet fetching
app.use('/api', eduRouter);

// Start the server
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servers running on port ${PORT}`);
});
