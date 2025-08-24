##################
# BUILD BASE IMAGE
##################

FROM node:20-alpine AS base

#############################
# BUILD FOR LOCAL DEVELOPMENT
#############################

FROM base AS development
WORKDIR /app
RUN chown -R node:node /app

COPY --chown=node:node package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

#####################
# BUILD BUILDER IMAGE
#####################

FROM base AS builder
WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node --from=development /app/src ./src
COPY --chown=node:node --from=development /app/tsconfig.json ./tsconfig.json
COPY --chown=node:node --from=development /app/tsconfig.build.json ./tsconfig.build.json
COPY --chown=node:node --from=development /app/nest-cli.json ./nest-cli.json

# Build NestJS (output dist/)
RUN npm run build

# Re-install only production dependencies
ENV NODE_ENV production
RUN rm -rf node_modules && npm ci --omit=dev

USER node

######################
# BUILD FOR PRODUCTION
######################

FROM node:20-alpine AS production
WORKDIR /app

RUN mkdir -p src/generated && chown -R node:node src

# Copy the bundled code and production deps
COPY --chown=node:node --from=builder /app/src/generated/i18n.generated.ts ./src/generated/i18n.generated.ts
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/package.json ./

USER node

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
