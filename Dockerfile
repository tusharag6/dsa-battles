# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if you have one) to the working directory
COPY package.json pnpm-lock.yaml* ./

# Copy the workspace configuration
COPY pnpm-workspace.yaml ./

# Copy the server package.json
COPY apps/server/package.json ./apps/server/

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the server application (adjust the script name if necessary)
RUN pnpm --filter server build

# Expose the port your server runs on (adjust if necessary)
EXPOSE 5001

# Command to run the server
CMD ["pnpm", "--filter", "server", "dev"]