import mongoose from "mongoose"
import config from "./config";

let connection: mongoose.Connection|undefined = undefined;

const openConnection = () => {
  if (!config.mongoUri) throw new Error("Mongo_uri is undefined");

  mongoose.set("strictQuery", true);
  mongoose.connect(config.mongoUri);
  connection = mongoose.connection;
}

const closeConnection = () => {
  connection.close();
  connection = undefined;
}

export default {
  connection,
  openConnection,
  closeConnection,
}
