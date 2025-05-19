import mongoose from "mongoose";
import dotenv from "dotenv";
import { MONGO_URI } from "../env";

dotenv.config();

// MongoDB connection options for reliability
const mongooseOptions = {
  socketTimeoutMS: 60000,
  connectTimeoutMS: 60000,
  serverSelectionTimeoutMS: 60000,
};

const connectDB = async (): Promise<void> => {
  let retries = 5;

  // Log partial connection string for debugging (masking credentials)
  const maskedUri = MONGO_URI.includes("@")
    ? MONGO_URI.replace(/:\/\/(.*):(.*)@/, "://**username**:**password**@")
    : MONGO_URI.substring(0, 20) + "...";
  console.log(`Connecting to MongoDB: ${maskedUri}`);

  while (retries > 0) {
    try {
      console.log(`Connection attempt ${6 - retries}/5`);
      const conn = await mongoose.connect(MONGO_URI, mongooseOptions);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error: any) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      retries--;

      if (retries === 0) {
        console.error("Failed to connect to MongoDB after multiple attempts");
        process.exit(1);
      }

      // Wait 5 seconds before retrying
      console.log(`Retrying in 5 seconds... (${retries} attempts remaining)`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

export default connectDB;
