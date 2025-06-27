import { readFileSync } from 'node:fs'
import path from 'node:path'
import { up } from "./miniCompose/up.js"
import { down } from "./miniCompose/down.js"
import { shutdownListening } from "./miniCompose/utils/down/shutdown.js"

(async () => {
  const arg = process.argv.slice(2)[0]
  const composePath = process.env.NODE_ENV === 'production'
    ? './miniCompose/compose.json'
    : './miniCompose/compose.dev.json'

  const resolvedPath = path.resolve(composePath)
  const config = JSON.parse(readFileSync(resolvedPath, 'utf-8'))
  const actions = {
    up: up,
    down: down,
  }
  const action = actions[arg]
  if (!action) {
    console.error('Unknown action: ' + arg)
    process.exit(1)
  }

  try {
    await action(config)
  } catch (err) {
    console.error('Internal Server Error: ', err.stack || err)
    process.exit(1)
  }

  shutdownListening(config.services, config.network)
})()

process.on('uncaught', err => {
  console.error('Uncaught Exception:', err.message)
  console.error(err.stack)
  process.exit(1)
})

process.on('unhandledRejection', reason => {
  console.error('Unhandled rejection:', reason.stack)
  process.exit(1)
})
