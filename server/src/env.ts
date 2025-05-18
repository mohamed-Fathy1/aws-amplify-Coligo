import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Load .env file
dotenv.config();

// Environment variables with defaults
export const PORT = process.env.PORT || 5001;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/coligo";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "30d";
