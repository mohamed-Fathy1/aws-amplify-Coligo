#!/bin/sh
set -e

# Navigate to server directory
cd /app/server

# Run seed script
echo "Running database seed..."
npm run seed

# Start the server
echo "Starting server..."
npm start 