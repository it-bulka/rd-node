import { Express } from 'express'
import { EnvType } from '@/config'
import { pinoOption } from '@/config/pino.ts'

export const setLogger = async (app: Express, NODE_ENV: EnvType['NODE_ENV']) => {
  if (NODE_ENV === 'prod') {
    const pino = (await import('pino')).default
    const pinoHttp = (await import('pino-http')).default

    const logger = pino({ level: 'info' })
    app.use(pinoHttp(pinoOption(logger)))

    return
  }

  const morgan = (await import('morgan')).default
  app.use(morgan('dev'))
}