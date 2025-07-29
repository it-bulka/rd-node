# HW-10: Generic ORM with PostgreSQL

## Description

Generic `Orm<T>` class for basic CRUD with PostgreSQL using `pg-pool`

Example repo for `products` table. Demo runs CRUD operations sequentially:
`save → find → update → delete → findOne`

---
Example implementation uses a repository for the **products** table.


The entire setup runs inside **Docker** containers.

## Installation
```bash
    git clone https://github.com/it-bulka/rd-node
    cd hw-10
    pnpm build:docker
```

## How to run

| Command               | Description                       |
|-----------------------|-----------------------------------|
| `pnpm build:docker`   | Build and start Docker containers |
| `pnpm dev`            | Run demo in development mode      |
| `pnpm build`          | Compile TypeScript                |
| `pnpm start`          | Run compiled demo                 |


## Demo Output

Console shows:

1. Saved record (save)  
2. Array of records (find)  
3. Updated record (update)  
4. Empty result after delete (findOne)


## 🔁 Hot Reload & Manual Restart in Development

During development, if you make code changes and want to test them **without rebuilding the container**, you can run:

```bash
    pnpm restart:demo
```
> **NOTE**: The demo_dev container must be running before you execute this command. <br><br>
> Since the container is started without the `-d` (detach) flag to show logs in the terminal,  <br>
> please open a **new terminal window** before running the interactive command below.

Useful for running code interactively or testing one-off changes without restarting Docker

