import mongoose from "mongoose"
import config from "./config";

// let connection: mongoose.Connection | undefined = undefined;

// const openConnection = async () => {
//   if (!config.mongoUri) throw new Error("Mongo_uri is undefined");

//   mongoose.set("strictQuery", true);
//   await mongoose.connect(config.mongoUri);
//   connection = mongoose.connection;
// }

// const closeConnection = async () => {
//   await connection.close();
//   connection = undefined;
// }

// export default {
//   connection,
//   openConnection,
//   closeConnection,
// }

class MongoManager {
  private static instance: MongoManager;
  private connection: mongoose.Connection | undefined;

  private constructor() {
    this.connection = undefined;
  }

  static getInstance(): MongoManager {
    if (!MongoManager.instance) {
      MongoManager.instance = new MongoManager();
    }
    return MongoManager.instance;
  }

  async openConnection(): Promise<void> {
    if (!config.mongoUri) throw new Error("Mongo_uri is undefined");

    if (this.connection) {
      return;
    }

    mongoose.set("strictQuery", true);
    await mongoose.connect(config.mongoUri);
    this.connection = mongoose.connection;
  }

  async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = undefined;
    }
  }

  getConnection(): mongoose.Connection | undefined {
    return this.connection;
  }
}

export default MongoManager.getInstance();
