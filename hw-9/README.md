# Distributed Chat Backend (NestJS + RxJS)

## Overview

Backend for a distributed chat messenger with REST API and WebSocket support.  
Supports multiple instances connected via Redis pub/sub and balanced by a Load Balancer.

---

## Tech Stack

- NestJS v10+
- RxJS 7+
- TypeScript
- Redis (pub/sub)

---

## Application Configuration

- The application listens internally on port `80`
- Nginx acts as a reverse proxy/load balancer in front of the application


## Installation
```bash
    git clone https://github.com/it-bulka/rd-node
    cd hw-9
    pnpm i
```

---

## Commands

```bash
    pnpm dev       # start dev server with hot reload
    pnpm start:prod  # start production mode
```

---

## REST API

### User management

- `POST /api/users` — create user (supports multipart icon upload)
- `GET /api/users` — list users
- `GET /api/users/:id/icon` — get user icon (fallback to default)

### Chats

- `POST /api/chats` — create private/group chat
- `GET /api/chats` — list user chats
- `PATCH /api/chats/:id/members` — add/remove members (admin only)
- `DELETE /api/chats/:id` — delete chat (admin only)

### Messages (pagination by cursor ISO date)

- `GET /api/chats/:id/messages?cursor=&limit=` — list messages
- `POST /api/chats/:id/messages` — send message

**Headers:** `X-User` — username for auth and ownership.


## WebSocket (/ws)

- Handshake with header `X-User` for user identification

### Client events

- `join` `{ chatId }`
- `leave` `{ chatId }`
- `send` `{ chatId, text }`
- `typing` `{ chatId, isTyping }`

### Server broadcasts

- `chatCreated` `{ ChatDTO }`
- `membersUpdated` `{ chatId, members }`
- `message` `{ MessageDTO }`
- `typing` `{ chatId, user, isTyping }`

### Internals

RxJS Subjects/Observables + Redis pub/sub for event replication.

