import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Determine the MongoDB connection string
const getMongoDB = () => {
  // Check all common environment variable names for MongoDB connection
  const uri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.DATABASE_URL ||
    process.env.MONGO_URL;

  // If we have a URI, use it
  if (uri) {
    console.log("Using provided MongoDB connection string");
    return uri;
  }

  // Default for local development
  console.log("Missing MongoDB connection string! Using localhost fallback.");
  return "mongodb://localhost:27017/coligo";
};

// Environment variables with defaults
export const PORT = process.env.PORT || 5001;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const MONGO_URI = getMongoDB();
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "30d";
