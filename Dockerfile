FROM node:22-alpine3.18 as build-stage

WORKDIR /app

# Copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install

# Set to production environment
ENV NODE_ENV production

# Set the timezone
ENV TZ=Europe/Paris

# Copy source code
COPY --chown=node:node . .

# Generate the production build
RUN npm run build

# Remove the dev dependencies
RUN npm prune --production && npm cache clean --force


# Path: Dockerfile
FROM node:22-alpine3.18 as production-stage

WORKDIR /app

# Set to production environment
ENV NODE_ENV production
# Set the Timezone
ENV TZ=Europe/Paris

# Set API URL 
ARG API_URL
ENV VITE_API_URL=${API_URL}

# Copy the build from the build-stage
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/package.json ./app

# Install serve package globally
RUN npm install -g serve

# Expose the port
ENV PORT = 5000
EXPOSE 5000

# Start the application
CMD ["npm", "run", "preview"]





