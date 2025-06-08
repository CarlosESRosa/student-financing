FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Verify build output
RUN ls -la dist/

# Start the application
EXPOSE 3000

# Use a shell form to allow environment variable substitution
CMD node dist/index.js 