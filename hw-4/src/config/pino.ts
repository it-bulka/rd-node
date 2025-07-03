import type { Logger } from 'pino'
import type { IncomingMessage as IM, ServerResponse as SR } from 'http'

export const pinoOption = (logger: Logger) => ({
  logger,
  customLogLevel: (_req: IM, res: SR, err?: Error) => {
    if (res.statusCode >= 500 || err) return 'error'
    if (res.statusCode >= 400) return 'warn'
    return 'info'
  },
  autoLogging: true,
})
