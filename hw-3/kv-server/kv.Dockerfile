## Stage 1
FROM itbulka/node-base AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY ./src ./src


## Stage 2
FROM alpine:3.22
RUN apk add --no-cache nodejs tini \
    && adduser -D -h /home/node node

WORKDIR /home/node
USER node

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/package.json ./

EXPOSE 3000
CMD ["node","src/server.js"]