import http from 'node:http'
import { createApp } from '@/app';

const bootstrap = () => {
  const app = createApp()
  const server = http.createServer(app)

  const PORT = process.env.PORT || 3000
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
}

bootstrap()

process.on('uncaughtException', (err) => {
  console.error(`Error: ${err.message} at ${err.stack}`)
})

process.on('unhandledRejection', (reason: Error) => {
  console.log(`Unhandled Rejection ${reason.stack}`)
})
