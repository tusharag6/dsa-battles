FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Copy the db package
COPY packages/db ./packages/db

# Install dependencies
RUN npm install

# Set the working directory to the db package
WORKDIR /app/packages/db

# Run the migration command
CMD ["npm", "run", "db:migrate"]