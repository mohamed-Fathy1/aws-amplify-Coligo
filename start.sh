#!/bin/sh
set -e

# Give MongoDB time to initialize properly
echo "Waiting for MongoDB to be ready (3 seconds)..."
sleep 3

# Navigate to server directory
cd /app/server

# Check for MongoDB connection string
if [ -z "$MONGODB_URI" ]; then
  echo "ERROR: MONGODB_URI environment variable is not set!"
  echo "Please set a valid MongoDB connection string."
  exit 1
fi

# Additional waiting period to ensure MongoDB is ready
echo "Waiting for MongoDB to be fully ready..."
sleep 5

# Run seed script with proper error handling
echo "Running database seed..."
npm run seed || {
  echo "Seed script failed, but continuing anyway..."
}

# Start the server
echo "Starting server..."
exec npm start 