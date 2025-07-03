if (process.env.NODE_ENV !== 'production') {
  import('dotenv/config')
}
import http from 'node:http'
import { createApp } from './app.ts'
import { container } from '@/container.ts'

const app = await createApp()
const server = http.createServer(app)

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

function shutDown() {
  console.log('Shutting down gracefully...')
  server.close(async () => {

    await container.dispose()

    console.log('Closed out connections')
    process.exit(0)
  })

  setTimeout(() => process.exit(1), 10_000).unref()
}
process.on('SIGTERM', shutDown)
process.on('SIGINT',  shutDown)