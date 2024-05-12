# Use the official Node.js image as base
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN yarn

# Copy source code
COPY . .

# Build backend
RUN yarn build

# Expose port
EXPOSE 8080

# Command to run the application
CMD ["yarn", "start"]
