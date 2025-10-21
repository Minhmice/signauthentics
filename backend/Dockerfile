# ============================================
# SIGNAUTHENTICS - NEXT.JS PRODUCTION BUILD
# ============================================
# Multi-stage Dockerfile for Next.js standalone output
# Optimized for ARM64 (Raspberry Pi 5)
# Ref: https://nextjs.org/docs/advanced-features/output-file-tracing
# Ref: https://github.com/vercel/next.js/tree/canary/examples/with-docker

# ============================================
# STAGE 1: Dependencies
# ============================================
FROM --platform=linux/arm64 node:20-alpine AS deps

WORKDIR /app

# Install dependencies based on preferred package manager
COPY package.json package-lock.json* ./

RUN npm ci --only=production --ignore-scripts

# ============================================
# STAGE 2: Builder
# ============================================
FROM --platform=linux/arm64 node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build args for Next.js public env vars
# Ref: https://nextjs.org/docs/basic-features/environment-variables
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_IMGPROXY_URL

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_IMGPROXY_URL=$NEXT_PUBLIC_IMGPROXY_URL

# Build Next.js with standalone output
# Ref: https://nextjs.org/docs/advanced-features/output-file-tracing
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ============================================
# STAGE 3: Runner
# ============================================
FROM --platform=linux/arm64 node:20-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output
# Ref: https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/healthz', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start server
CMD ["node", "server.js"]

