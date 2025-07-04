# Coffee Brew Log API 
This project demonstrates working with express.

## Installation
```bash
    git clone https://github.com/it-bulka/rd-node
    cd hw-4
    npm install
```

## Key Features
- **Layered Architecture** – separate layers for DTOs, services, controllers, and routes.
- **Dependency Injection** – using Awilix to register and inject services into controllers.
- **In-memory Storage** – all data is stored within the BrewsService, avoiding global variables.
- **Validation with Zod** – including custom validate() middleware for request validation.
- **Swagger UI** – available at /docs; schemas are auto-generated from Zod via zod-to-openapi.
- **Query Filtering** – supports filtering via query parameters (method and rating) in GET /api/brews.
- **Security Middleware** – includes helmet, cors, and compression.
- **Rate Limiting** – limits to 10 POST requests per minute (returns HTTP 429).
- **Logging** – uses `morgan` for dev; `pino` in production.
- **Graceful Shutdown** – handles SIGINT and SIGTERM, closing the HTTP server and disposing of the DI container.
- **ESBuild Bundling** – builds with esbuild; output runs via `node dist/server.mjs`.
- **Multi-stage Docker Build** – final image under 150MB; run with: <br>`docker run -p 3000:3000 brew-api`

## Commands list:
| Command                  | Description                                                                                 |
|--------------------------|---------------------------------------------------------------------------------------------|
| `npm run dev`            | run project in development mode                                                             |
| `npm run build`          | ts-check & build project in production mode                                                 |
| `npm run start`          | run built bundle in production mode                                                         |
| `npm run docker:build`   | build docker image "brew-api" of project                                                    |
| `npm run docker:run`     | run docker image "brew-api" <br>(!! It should be done only after <br>`npm run docker:build` |

#### Additional Commands:
| Command                   | Description                                                                                 |
|---------------------------|---------------------------------------------------------------------------------------------|
| `npm run type-check`      | types check of project                                                                      |
| `npm run bundle`          | build project in production mode  without types check                                       |
| `npm run lint`            | linting                                                                                     |


## 📘 API Documentation

The full list of available endpoints is documented using **Swagger**.

To view the Swagger UI:

1. Start the application in development mode:
```bash
   npm run dev
```
2. Open your browser and navigate to:
    http://localhost:3000/docs

 > **Note:** The Swagger UI is available only in **development** mode.
  



