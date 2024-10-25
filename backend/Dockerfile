# Dockerfile for the backend
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY backend/ ./

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
