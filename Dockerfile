# Stage 1: Build Angular app
FROM node:18.20-alpine AS build-stage

WORKDIR /app

# Copiar archivos package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de código
COPY . .

# Build producción (tanto browser como server)
RUN npm run build -- --configuration production

# Stage 2: Servir con Node
FROM node:18.20-alpine

WORKDIR /app

# Copiar solo lo necesario desde build-stage
COPY --from=build-stage /app/dist/app-andamios ./dist/app-andamios
COPY --from=build-stage /app/package*.json ./

# Instalar solo producción
RUN npm install --omit=dev

# Expone el puerto donde corre tu servidor
EXPOSE 4000

# Comando para correr tu servidor (ajusta si tienes otro entrypoint)
CMD ["node", "dist/app-andamios/server/server.mjs"]
