FROM node:20-alpine AS base
FROM base AS deps
RUN apk add --no-cache libc6-compat git
WORKDIR /app
COPY package.json package-lock.json ./
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm install --frozen-lockfile
RUN npm i sharp
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build
FROM base AS runner
RUN addgroup nodejs
RUN adduser -SDH nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "wget", "-qO-", "http://localhost:3000/health" ]
CMD ["node", "server.js"]
