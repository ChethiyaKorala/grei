# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies
RUN npm ci || npm install

# Copy source code
COPY . .

# Build the Next.js app
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install dumb-init to handle signals properly
RUN apk add --no-cache dumb-init

# Copy built application and dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Set ownership of app directory
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 3000

# Use dumb-init to properly handle signals
ENTRYPOINT ["dumb-init", "--"]

# Start the app
CMD ["npm", "start"]
