import mongoose from "mongoose"
import config from "./config";

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
    if (!config.MONGODB_URI) throw new Error("Mongo_uri is undefined");

    if (this.connection) {
      console.log('Already connected to MongoDB');
      return;
    }

    try {
      mongoose.set("strictQuery", true);

      // Setup the connection event listeners before attempting to connect
      mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB');
      });

      mongoose.connection.on('error', (err) => {
        console.error('Error connecting to MongoDB:', err);
      });

      await mongoose.connect(config.MONGODB_URI);
      this.connection = mongoose.connection;
      console.log('Connection process initiated');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  async closeConnection(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.close();
        console.log('Disconnected from MongoDB');
        this.connection = undefined;
      } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
        throw error;
      }
    } else {
      console.log('No active MongoDB connection to close');
    }
  }

  getConnection(): mongoose.Connection | undefined {
    return this.connection;
  }
}

export default MongoManager.getInstance();
