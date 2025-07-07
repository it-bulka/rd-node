# Stage 1: build
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build && npm prune --production

# Stage 2: production image
FROM alpine:3.22 AS production

RUN apk add --no-cache nodejs npm tini && adduser -D -h /home/node node

WORKDIR /home/node
USER node

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

ENTRYPOINT ["/sbin/tini","--"]
CMD ["node", "dist/main.js"]

