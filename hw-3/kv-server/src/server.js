if (process.env.NODE_ENV !== 'production') {
  import('dotenv/config')
}
import express from 'express'
import { getKey, setKey } from "./controllers/kv.controller.js"

import { errorHandler } from "./middleware/errorHandler.js"
import { notFound } from "./middleware/notFound.js"

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.get('/kv/:key', getKey)
app.post('/kv', setKey)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

process.on('unhandledRejection', (reason) => {
  console.log(`Unhandled Rejection ${reason.stack}`)
})