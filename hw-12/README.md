
## Installation and run the project
```bash
    git clone https://github.com/it-bulka/rd-node
    cd hw-12
    npm i
    # start prisma image with Docker
    npm run start:docker
    # start project in watch mode
    npm run start:dev
```

### Seed (optionally)
```bash
  npm run seed
```
- **NOTE:** with seed you will have 2 accounts to initially test request

### Run tests
```bash
  # e2e tests
  npm run test:e2e
```
---

## Available Endpoints
> **Note:** The list below includes only the currently implemented endpoints.

### POST /transfer
- **Description**: Performs an atomic transfer of funds between accounts.
- **Body**:
  ```json
  {
    "from": "d283490c-8cf6-40f9-8e9e-3de366d2a0d8", // sender account ID (UUID)
    "to": "36b180e8-ad43-423a-9b7a-103d548be579",   // receiver account ID (UUID)
    "amount": 40                                    // amount to transfer (number)
  }

---
#### Example cURL
- **NOTE:** curl with seed data mentioned above
```bash
   curl -X POST http://localhost:3000/transfer   -H "Content-Type: application/json"   -d '{
    "from": "d283490c-8cf6-40f9-8e9e-3de366d2a0d8",
    "to": "36b180e8-ad43-423a-9b7a-103d548be579",
    "amount": 40
  }'

```
