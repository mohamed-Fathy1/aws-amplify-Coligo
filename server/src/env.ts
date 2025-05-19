import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Determine the MongoDB connection string
const getMongoDB = () => {
  // Check all common environment variable names for MongoDB connection
  const uri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.DATABASE_URL;

  // If we have a URI, use it
  if (uri) {
    console.log("Using provided MongoDB connection string");
    return uri;
  }

  // Otherwise try to connect to Railway's MongoDB or fallback to localhost
  if (process.env.RAILWAY_ENVIRONMENT) {
    console.log("Using Railway MongoDB connection");
    return "mongodb://mongodb:27017/coligo";
  }

  // Default for local development
  console.log("Using local MongoDB connection");
  return "mongodb://localhost:27017/coligo";
};

// Environment variables with defaults
export const PORT = process.env.PORT || 5001;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const MONGO_URI = getMongoDB();
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "30d";
