# Use an official Node.js runtime as a parent image
FROM node:14-slim as build-stage

# Set environment variables for Node.js
ENV NODE_ENV=production

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container at /app
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code into the container at /app
COPY . .

# Build the Vite application for production
RUN npm run build
