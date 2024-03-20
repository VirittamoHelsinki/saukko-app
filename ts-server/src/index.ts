import path from "path";
import express from 'express';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import config from "./utils/config";
import cors, { CorsOptions } from 'cors';
import {} from './middleware/middleware'

const app = express();

// Import routes

// Middleware setup
app.use(express.json());
app.use(express.static('../client/build'));
app.use(cookieParser());

const corsOptions: CorsOptions = {
  origin: "http://localhost:3000", // or wherever your server is hosted "https://eperusteet.opintopolku.fi/eperusteet-service/api/external"
  credentials: true, // if your frontend needs to send cookies or authentication headers
};

if (config.ENVIRONMENT === 'development') {
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
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => console.log('Connected to MongoDB'));

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = app;
