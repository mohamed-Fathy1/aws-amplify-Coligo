import mongoose from "mongoose";
import dotenv from "dotenv";
import { MONGO_URI } from "../env";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.log(
      "Continuing without database connection for demonstration purposes"
    );
  }
};

export default connectDB;
