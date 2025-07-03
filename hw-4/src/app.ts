import type { IncomingMessage as IM, ServerResponse as  SR } from 'http'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { scopePerRequest } from 'awilix-express'
import { container } from './container'
import brewsRoutes from './routes/brews.routes'

import { errorHandler, notFound } from '@/middleware'

export const createApp = async () => {
  const app = express()

  app.use(helmet())
  app.use(cors())
  app.use(rateLimit({
    windowMs: 60_000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
  }))
  app.use(compression())

  let morgan
  let pinoHttp
  if (process.env.NODE_ENV === 'dev') {
    morgan = (await import('morgan')).default
    app.use(morgan('dev'))
  }

  if (process.env.NODE_ENV === 'prod') {
    const pino = (await import('pino')).default
    pinoHttp = (await import('pino-http')).default

    const logger = pino({ level: 'info' })

    app.use(pinoHttp({
      logger,
      customLogLevel: (_req: IM, res: SR, err?: Error) => {
        if (res.statusCode >= 500 || err) return 'error'
        if (res.statusCode >= 400) return 'warn'
        return 'info'
      },
      autoLogging: true,
    }))
  }


  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(scopePerRequest(container))

  app.use('/api/brews', brewsRoutes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}