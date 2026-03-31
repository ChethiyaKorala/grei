# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable

# Copy package manager files first for better layer caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js app
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install dumb-init to handle signals properly
RUN apk add --no-cache dumb-init

ENV NODE_ENV=production
ENV PORT=3000

# Enable pnpm
RUN corepack enable

# Copy built application and dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Set ownership of app directory
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]


CMD ["pnpm", "exec", "next", "start", "-H", "0.0.0.0", "-p", "3000"]