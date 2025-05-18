import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Environment variables with defaults
export const PORT = process.env.PORT || 5001;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/coligo";
