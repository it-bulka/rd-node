if (process.env.NODE_ENV !== 'production') {
  import('dotenv/config')
}
import http from 'node:http'
import { createApp } from './app.ts'

const app = await createApp()
const server = http.createServer(app)

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server started on port ${port}`)
})