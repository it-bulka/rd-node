import { Express } from 'express'
import type { EnvType } from '@/config'
import { pinoOption } from '@/config/pino';

export const setLogger = async (app: Express, NODE_ENV: EnvType['NODE_ENV']) => {
  if (NODE_ENV === 'production') {
    const pino = (await import('pino')).default
    const pinoHttp = (await import('pino-http')).default

    const logger = pino({ level: 'info' })
    app.use(pinoHttp(pinoOption(logger)))

    return
  }

  const morgan = (await import('morgan')).default
  app.use(morgan('dev'))
}