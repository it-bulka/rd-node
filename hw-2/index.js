import http from "node:http"
import {  getRoutes, } from "./libs/file-routing/index.js"
import { handleRoutes } from "./libs/external-api/index.js"
import { handlerError } from "./libs/external-api/handleError.js"

const initServer = async (innerFileRoutes) => {
  const server = http.createServer(async (req, res) => {
    await handlerError(req, res, innerFileRoutes, handleRoutes)
  })

  server.listen(3000, () => {
    console.log('Server listening on port 3000')
  })
}

getRoutes()
  .then(routes => initServer(routes))
  .catch(error => console.log(error))


process.on('uncaughtException', (err) => {
  console.error(`Error: ${err.message} at ${err.stack}`)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Unhandled Rejection at ${JSON.stringify(promise, null, 2)}, "reason": ${reason.stack}`)
})