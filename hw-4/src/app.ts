import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { scopePerRequest } from 'awilix-express'
import swaggerUi from 'swagger-ui-express'

import { config } from '@/config'
import { setLogger } from '@/utils/setLogger.ts'
import { container } from './container'
import brewsRoutes from './routes/brews.routes'
import { geterateZodSpec } from '@/docs/openapi.ts'
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

  await setLogger(app, config.env)

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(scopePerRequest(container))

  app.use('/api/brews', brewsRoutes)

  if (config.env === 'dev') {
    const baseUrl = `${config.baseUrl}/api`
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(geterateZodSpec(baseUrl)));
    console.log(`Swagger docs → ${config.baseUrl}/docs`);
  }

  app.use(notFound)
  app.use(errorHandler)

  return app
}