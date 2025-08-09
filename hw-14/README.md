# Kafka Monorepo

## Overview

This repo contains two NestJS microservices using Kafka and Redis for event processing:

- **NotificationService** — produces `UserSignedUp` events to Kafka topic `events.notifications`.
- **LoggerService** — consumes events from Kafka topic and logs them to console.

---

## Installation
```bash
    git clone https://github.com/it-bulka/rd-node
    cd hw-14
    npm i
```

## Architecture

- Kafka broker + Zookeeper run via Docker Compose
- Kafka UI available on http://localhost:8080 (after starting project)
- Redis used for event retry stream: `retries.notifications`
- Monorepo with `notification-service` and `logger-service` workspaces

---

## Features

### Level 1 - Basic

- Kafka producer in NotificationService publishes `UserSignedUp` events on POST `/signup`
- Kafka consumer in LoggerService logs events from `events.notifications` topic
- Uses `@nestjs/microservices` with Kafka transport

### Level 2 - Advanced

- Redis stream `retries.notifications` buffers events if consumer crashes
- RetryWorker reads Redis stream and re-emits to Kafka
- Implements reliable retry using Redis commands `XADD`, `XREAD`, `XDEL`

---

## Scripts

```json
{
  "scripts": {
    "start:notification": "npm run start:dev --prefix ./notification-service",
    "start:logger": "npm run start:dev --prefix ./logger-service",
    "start:docker": "docker-compose up -d",
    "start": "npm run start:docker && concurrently --kill-others-on-fail --prefix [{name}] \"npm run start:notification\" \"npm run start:logger\""
  }
}
```
- `npm run start` — starts Kafka stack + both microservices concurrently

### Test command
- Use this command to test the project after startup:
```bash
    curl -X POST http://localhost:3000/signup -H "Content-Type: application/json" -d '{"username":"anna","email":"anna@example.com"}'
```