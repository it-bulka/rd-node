# Zip Image Processor

This project accepts a zip archive containing images, unpacks it, generates thumbnails using `sharp` (via workers), and responds with basic processing statistics.

## Features

- Accepts a `.zip` archive via POST request
- Unpacks the archive and processes image files
- Generates thumbnails using `sharp`
- Uses `worker_threads` to parallelize image processing
- Limits the number of concurrent workers for performance control

## Installation
```bash
    git clone https://github.com/it-bulka/rd-node
    cd hw-8
    pnpm i
```

## Main Project Commands to Start Server

| Mode           | Command                      | Description                                                                  |
|----------------|------------------------------|------------------------------------------------------------------------------|
| Development    | `pnpm run dev`               | Starts the server with `nodemon` for auto-reloading during development.      |
| Build          | `pnpm run build`             | Runs type checking and builds the project using `./builder/index.mjs`.       |
| Start          | `pnpm run start`             | Runs the compiled server from `dist/server.mjs`.                             |

## API Endpoint

**POST** `http://localhost:3000/zip`

- Expects `multipart/form-data`
- Form field name: `zip` (must be a `.zip` archive)

### Example Response

```json
{
  "processed": 48,
  "skipped": 2,
  "durationMs": 3278
}
```


---

### Example `curl` Command

```md
## Test with curl
```

``` bash
    curl -X POST http://localhost:3000/zip \
      -F "zip=@path/to/your/images.zip"
```


---

## Tech Stack

- **Node.js** + **Express** — HTTP server
- **sharp** — Thumbnail image processing
- **worker_threads** — Parallel workers for processing
- **multer** — Handles incoming file uploads via `multipart/form-data`

## Notes

- Only image files are processed (`.jpg`, `.jpeg`, `.png`, `.webp`)
- Non-image files inside the zip will be skipped
- Thumbnails are generated with constrained concurrency using limited worker threads






