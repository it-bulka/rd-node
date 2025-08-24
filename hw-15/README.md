## Installation
```bash
    git clone https://github.com/it-bulka/rd-node
    cd hw-15
    npm i
```

## How to run
```bash
    npm run docker:dev # or npm run docker:dev
    npm run docker:app
    
    # others scripts for checking app
```

## Scripts

| Command                | Description                                                      |
|------------------------|------------------------------------------------------------------|
| `npm run docker:prod`  | Build and start Docker containers (prisma and app in build mode) |
| `npm run docker:dev`   | Build and start Docker containers (prisma and app in dev mode)   |
| `npm run docker:app`   | Runs a command inside a running container                        |
| `npm run lint`         | Run linter (just in dev mode)                                    |
| `npm run build`        | build project (prod mode)                                        |
| `npm run schema:log`   | Show differences between entities and DB (typeorm schema:log)    |                  
| `npm run schema:check` | Show differences between entities (migrations) and DB            |      


### Git Hooks

We use [Husky](https://typicode.github.io/husky) for Git hooks.  
A **pre-commit hook** is configured to run ESLint and schema checks before every commit.

Hook script: [`.husky/pre-commit`](./.husky/pre-commit)


### CI/CD

This project includes a custom **GitHub Action** for building and publishing Docker images.

- **Reusable action**: [`.github/actions/build-push/action.yml`](../.github/actions/build-push/action.yml)  
  Performs the following steps:
    1. `npm ci`
    2. `npm run build`
    3. `docker build` with tag `ghcr.io/${{ github.repository }}:${{ github.sha }}`
    4. Login to GHCR
    5. `docker push`

- **Workflow**: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)  
  Runs the action on every `pull_request` into the `develop` branch.

