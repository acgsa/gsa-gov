# syntax=docker/dockerfile:1
# --------------------------------------------------------------------------
# GSA.GOV Website — Production Container
# Base image: Node.js 20 LTS Alpine (minimal attack surface)
# --------------------------------------------------------------------------

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars (non-secret) must be passed as build args
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_PAYLOAD_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_PAYLOAD_URL=${NEXT_PUBLIC_PAYLOAD_URL}

RUN npm run build

# Production image — copy only the built output
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Run as non-root user (security hardening)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
