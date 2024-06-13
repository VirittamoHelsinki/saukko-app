import path from "path";
import express from 'express';
import mongo from "./utils/mongo";
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

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.static('../client/build'));
app.use(cookieParser());

const corsOptions: CorsOptions = {
  origin: config.ENVIRONMENT === 'development'
    ? "http://localhost:3000"
    : `https://${config.ENVIRONMENT === 'staging'
      ? "dev-saukko-app-fzhpicxhe5j74.azurewebsites.net"
      : "dev-saukko-app-fzhpicxhe5j74.azurewebsites.net"}`,
  credentials: true,
}

if (config.ENVIRONMENT === 'development') {
  app.use(middleware.requestLogger);
  // app.use(cors(corsOptions));
  // console.log("CORS options enabled")
} /*else app.use(cors())*/

app.use(cors(corsOptions))

mongo.openConnection();

const staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

// Inject tokens to in Request
app.use("*", tokensMiddleware);

// Swagger
const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/env', (_req, res) => res.json({ env: config.ENVIRONMENT }))

// Routes
// app.use("/test", testRouter)
app.use("/auth", authRouter);
app.use("/api", degreeRouter);
app.use("/api", workplaceRouter);
app.use("/api", evaluationRouter);
app.use("/api", eReqRouter);


app.use('/api/status', (_req, res) => {
  const isConnected = !!mongo.getConnection()
  res.json({
    message: 'API is working',
    mongoDbConnection: isConnected,
  });
});

// Serve the React app 
app.get('*', (req, res) => {
  if (config.ENVIRONMENT === 'development') {
    return res.status(404).json({
      errorMessage: `For developing react app, use port 5173 insted ${config.PORT}`
    })
  }
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
})
