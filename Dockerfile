# Use the official Node.js image as a base
FROM node:22-bookworm

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
# RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
RUN npm install react-scripts@latest

RUN npm install

# Copy the rest of the application code
COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the React application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
