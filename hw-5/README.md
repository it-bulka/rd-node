# Tea-Tracker API
This project demonstrates working with nest.js.

## Installation
```bash
    git clone https://github.com/it-bulka/rd-node
    cd hw-5
    npm install
```

## Key Features
- **Modular Architecture** – separate Tea module with controller, service, and DTOs.
- **Zod Validation** – `CreateTeaDto` and `UpdateTeaDto` via Zod schemas; no class-validator used.
- **Custom Pipe** – `ZodValidationPipe(schema)` performs schema validation without Nest pipes.
- **In-memory Repository** – CRUD with Promise-based service, uses UUID or timestamp as ID.
- **Filtering & Pagination** – `GET /tea` supports `minRating` and pagination query params (`page`, `pageSize`).
- **Guard & Decorators** – API key guard with custom `@Public()` decorator for open endpoints. Public is only /tea GET, 
    others endpoints requires header `x-api-key=”im_rd_student”`, otherwise error statusCode 400.
- **Rate Limiting** – `POST /tea` limited to 10 requests per minute.
- **Response Time Logging** – interceptor logs time to handle each request.
- **Swagger Integration** – available at `/docs`, DTOs documented via `@ApiProperty`.
- **Graceful Shutdown** – logs “Bye tea‑lovers 👋” on `SIGINT` using `onApplicationShutdown()`.
- **Multi-stage Docker Build** – optimized image; run with:  
  `docker run -p 3000:3000 tea-api`

## Compile and run the project:
| Command                | Description                                                                                |
|------------------------|--------------------------------------------------------------------------------------------|
| `npm run start:dev`    | run project in development mode                                                            |
| `npm run start:prod`   | run project in production mode                                                             |
| `npm run build`        | build project                                                                              |
| `npm run start`        | run built bundle in production mode                                                        |
| `npm run docker:build` | build docker image "tea-api" of project                                                    |
| `npm run docker:run`   | run docker image "tea-api" <br>(!! It should be done only after <br>`npm run docker:build` |


## 📘 API Documentation

The full list of available endpoints is documented using **Swagger**.

To view the Swagger UI:

1. Start the application:
- in development mode: `npm run start:dev`
- or in production mode `npm run build && npm run start`
- or via docker: `npm run docker:build && npm run docker:run`

2. Open your browser and navigate to:
   http://localhost:3000/docs

