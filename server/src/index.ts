import path from "path";
import express from 'express';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import config from "./utils/config";
import cors, { CorsOptions } from 'cors';
import middleware from './middlewares/middleware.error';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions';

import authRouter from "./routers/authRouter";
import degreeRouter from "./routers/degreeRouter";
import workplaceRouter from "./routers/workplaceRouter";
import evaluationRouter from "./routers/evaluationRouter";
import eReqRouter from "./routers/eReqRouter"
import tokensMiddleware from "./middlewares/middleware.tokens";

// import swaggerDocument from "./swaggerDoc.json"

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
  app.use(middleware.requestLogger);
  app.use(cors(corsOptions));
  console.log("CORS options enabled")
} else app.use(cors())

// Connect to the database
mongoose.set("strictQuery", true);
if (!config.MONGODB_URI) throw new Error("Check the .env")
mongoose.connect(config.MONGODB_URI)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => console.log('Connected to MongoDB'));

// Inject tokens to in Request
app.use("*", tokensMiddleware);

// Swagger
const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/auth", authRouter);
app.use("/api", degreeRouter);
app.use("/api", workplaceRouter);
app.use("/api", evaluationRouter);
app.use("/api", eReqRouter);

app.use('/api/status', (_req, res) => {
  res.json({
    message: 'API is working',
    mongoDbConnection: db.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Serve the React app 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
})
