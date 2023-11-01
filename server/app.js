// Import required modules and libraries
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { ENVIRONMENT } = require('./utils/config.js');
const { requestLogger } = require('./middleware/middleware.js');

const app = express();

// Import the routers
const userRouter = require("./routers/userRouter");
const degreeRouter = require("./routers/degreeRouter");
const workplaceRouter = require("./routers/workplaceRouter");
const evaluationRouter = require("./routers/evaluationRouter");

// Import the edu router for fetching ePerusteet
const eReqRouter = require("./routers/eReqRouter");

// Import the User model and JWT library (not used here...)
/* const User = require("./models/userModel");
const jwt = require("jsonwebtoken"); */

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.static('../client/build'));
app.use(cookieParser()); // Parse cookies

const corsOptions = {

  origin: "http://localhost:3000", // or wherever your server is hosted "https://eperusteet.opintopolku.fi/eperusteet-service/api/external"

  credentials: true, // if your frontend needs to send cookies or authentication headers
  // ... any other options you need
};

// Log incoming requests, when in development mode. (npm run dev)

if (ENVIRONMENT === 'development') {
  app.use(requestLogger);
  app.use(cors(corsOptions));
  console.log("CORS options enabled")
} else app.use(cors())


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

// Set up database model routers.
app.use('/api', degreeRouter);
app.use('/api', workplaceRouter);
app.use('/api', evaluationRouter);

// Set up routes for ePerusteet fetching
app.use('/api', eReqRouter);


// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = app;