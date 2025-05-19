FROM node:20.0.0

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install root dependencies (if any)
RUN npm install

# Install client dependencies
WORKDIR /app/client
RUN npm install

# Install server dependencies
WORKDIR /app/server
RUN npm install

# Return to root
WORKDIR /app

# Copy project files
COPY . .

# Make the start script executable
RUN chmod +x start.sh

# Build client with production-only build
WORKDIR /app/client
RUN npm run build:prod

# Build server
WORKDIR /app/server
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV SKIP_TESTS=true

# Expose the server port
EXPOSE 5000

# Start the server using the shell script
WORKDIR /app
CMD ["./start.sh"] 