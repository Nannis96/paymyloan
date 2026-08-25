# =========================================================================
# Landing de registro · PayMyLoan.ai
#
# Owner usa node:22-slim porque Prisma y bcrypt necesitan OpenSSL y toolchain
# de compilacion. Esta landing es solo front y no tiene dependencias nativas,
# asi que corre en alpine y la imagen final queda en decenas de MB.
#
# Build multietapa con salida "standalone": la imagen de runtime solo lleva
# el servidor y las dependencias que Next realmente usa, no node_modules.
# =========================================================================
FROM node:22-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1

# ---------- dependencias ----------
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- desarrollo (hot reload) ----------
# Se usa con docker-compose.dev.yml. El codigo se monta como volumen.
FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]

# ---------- build de produccion ----------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Las variables NEXT_PUBLIC_* se incrustan en el bundle al compilar, no se
# leen en runtime. Por eso entran como build args y no como env del contenedor.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_REGISTRO_ENDPOINT=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_REGISTRO_ENDPOINT=$NEXT_PUBLIC_REGISTRO_ENDPOINT

RUN npm run build

# ---------- runtime ----------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# No corre como root.
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
