import http from "node:http"
import { store } from "./store.js"

const answer = (statusCode, json, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.write(JSON.stringify(json))
  return res.end()
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x')
  if(url.pathname === '/get' && req.method === 'GET') {
    const key = url.searchParams.get('key')
    const value = store.get(key)

    return answer(200, { key, value }, res)
  }

  if(url.pathname === '/set' && req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        const { key, value } = JSON.parse(body)

        store.set(key, value)
        answer(200, { key, value }, res)
      } catch (err) {
        answer(400, { error: 'Invalid JSON' }, res)
      }
    })

    return
  }

  return answer(404, 'Route Not Found', res)
}).listen(4000, () => {
  console.log('Server is running on port 4000')
})