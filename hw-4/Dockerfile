# Stage 1: build + lint + type check
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV="prod"

RUN npm run lint
RUN npm run build

# Stage 2: production image
FROM alpine:3.22 AS production

RUN apk add --no-cache nodejs npm tini && adduser -D -h /home/node node

WORKDIR /home/node
USER node

COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm ci --omit=dev

ENV NODE_ENV="prod"
ENV PORT=3000
EXPOSE 3000

ENTRYPOINT ["/sbin/tini","--"]
CMD ["npm", "run", "start"]

