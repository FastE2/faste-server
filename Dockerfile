##################
# BASE IMAGE
##################
FROM node:20-alpine AS base

##############################
# DEVELOPMENT STAGE
##############################
FROM base AS development
WORKDIR /app

# Copy only the package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm ci --only=development

# Copy prisma folder into the container
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the app source code
COPY . .

# Ensure the node user has the correct permissions
RUN chown -R node:node /app

# Switch to node user for better security
USER node

# Expose the port for the development server
EXPOSE 8080

# Start the server with an increased memory limit
CMD ["node", "dist/main.js"]
# © Copyright belongs to the account [ahkiet lekiett2201@gmail.com]. Unauthorized copying, selling, distribution, or modification is prohibited.