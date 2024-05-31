import * as dotenv from "dotenv";

dotenv.config();

const environment = process.env.ENVIRONMENT;

const isDev = environment === "development";

export default {
  mongoUri: (isDev ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI_PROD) ?? process.env.MONGODB_URI,
  cosmosConnectionString: process.env.COSMOS_CONNECTION_STRING,
  emailServiceConnectionString: process.env.EMAIL_SERVICE_CONNECTION_STRING,
  emailFromSenderDomain: process.env.EMAIL_FROM_SENDER_DOMAIN,
  environment,
}
