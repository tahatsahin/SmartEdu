# Use a node LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the rest of the app
COPY . .

# Set env
ENV NODE_ENV=production
ENV PORT=3000

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
