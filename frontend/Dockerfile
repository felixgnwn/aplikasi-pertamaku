# Dockerfile for the frontend
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY frontend/ ./

# Expose the port that the app runs on
EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev"]