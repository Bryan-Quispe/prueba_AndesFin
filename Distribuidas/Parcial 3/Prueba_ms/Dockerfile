FROM node:20-alpine AS base

# Instalar dependencias de desarrollo
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# ===== Development Stage =====
FROM base AS development

RUN npm install

# Copiar TODO incluyendo prisma
COPY . .

# Generar cliente de Prisma (dummy URL for build time)
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# ===== Build Stage =====
FROM base AS builder

RUN npm ci

COPY . .

# Generar cliente de Prisma (dummy URL for build time)
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

# Construir la aplicación
RUN npm run build

# ===== Production Stage =====
FROM node:20-alpine AS production

WORKDIR /app

# Copiar archivos necesarios
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Variables de entorno
ENV NODE_ENV=production

EXPOSE 3000

# Ejecutar migraciones y luego la aplicación
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]