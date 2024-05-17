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

# Run the prisma generate
RUN npx prisma generate

# Generate the production build
RUN ["npm", "run", "build"]