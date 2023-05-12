// Import required modules and libraries
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Import the User model and JWT library (not used here...)
/* const User = require("./models/userModel");
const jwt = require("jsonwebtoken"); */

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies
app.use(
    cors({
        // Set the allowed origin for CORS
        origin: ["http://localhost:3000"],
        credentials: true, // Enable sending cookies in CORS requests
    })
);

// Connect to the database
mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.MDB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected!");
    })
    .catch((error) => {
        console.log("Unable to connect database");
    });

// Set up routes for authentication
app.use("/auth", require("./routers/userRouter"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servers running on port ${PORT}`);
});
