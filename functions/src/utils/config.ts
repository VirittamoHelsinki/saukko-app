import * as dotenv from "dotenv";

dotenv.config();

const environment = process.env.ENVIRONMENT;

const isDev = environment === "development";

export default {
  mongoUri: (isDev ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI_PROD) ?? process.env.MONGODB_URI,
  environment,
}
