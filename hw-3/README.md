# Docker for Node.js
This project demonstrates working with Docker by creating and managing containerized services.

## Installation
```bash
    git clone https://github.com/it-bulka/rd-node
    cd hw-3
    npm install
```

### Structure

- **Main goal**: Practicing containerization using Docker.
- **Services**:
    - `kv-service`: The main service responsible for handling incoming HTTP requests.
    - `redis-like`: Acts as a storage layer, similar to a Redis database.
- **Dockerfiles**:
    - Each service has its own `Dockerfile`.
    - `kv-service` includes two Dockerfiles:
        - `kv.Dockerfile` for **production**.
        - `kv.dev.Dockerfile` for **development**, including linting setup.
    - `kv.Dockerfile` is **multi-stage**, separating build and runtime stages.
- **Docker Compose**:
    - The project includes a `docker-compose.yml` file to run both services together via CLI:
      ```bash
      docker compose up
      ```
- **Automation script**:
    - `miniCompose.js` is a custom script that automates:
        - Building services from Dockerfiles.
        - Running containers.
        - Cleaning up containers and the Docker network after use.
- **Convenient npm commands**:
    - For easier interaction with the script `miniCompose.js`, the following npm commands are available:
      ```bash
      npm run up    # Runs the containers using miniCompose.js
      npm run down  # Stops and removes all running containers and the network
      ```


## Start
2 options for working:
1) run `docker-compose.yml`
2) run script which runs Dockerfiles for services
```
node index.js <command> [options]
```
## Commands list:
### Commands for working with `docker-compose.yml`
| Command               | Description                                       |
|-----------------------|---------------------------------------------------|
| `docker-compose up`   | run __**docker-compose.yml**__                    |
| `docker-compose down` | deleting container running by `docker-compose up` |


### Commands for working with `miniCompose.js`
| Command              | Description                                                                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `npm run up`         | runs docker commands for working with services form compose.json <br>(build and run containers `kv`, `kv.dev` & `redis`, create network, stream logs) |
| `npm run down`       | stops and removes created containers, described in compose.json                                                                                       |

## Ports
 - `8080` - for `kv` (container for production)
 - `8081` - for `kv.dev` (container for development, hot-reload with nodemon)
## Available Endpoints 

### POST /kv
- **Description**: Store data you send.
- **Body**:
  ```json
  {
    "name": "string",    
    "surname": "string"    
  }
  ```
  > **Note:** You are free to send and `key:value` pairs in body object.<br>
  > **Requirement**: type of `value` should be `string`
  
### GET /kv/:key
- **Description**: Returns `key:value` pairs.
- **Path Parameters**: <br>
  `key` – key from `key:value` pair of object you send in body in `POST /kv` endpoint


