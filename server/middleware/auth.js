// Import required modules and libraries
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    // Function to authenticate user
    try {
        const token = req.cookies.token; // Extracting token from cookies
        if (!token)
            return res.status(401).json({ errorMessage: "Unauthorized" }); // Check if token is missing

        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token using JWT_SECRET
        req.user = verified.user; // Assign verified user to request object

        next(); // Calling the 'next' function to pass control to the next middleware function
    } catch (err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

module.exports = auth;
