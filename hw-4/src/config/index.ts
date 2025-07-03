import { z } from 'zod'
import pkg from '../../package.json' assert { type: 'json' }

const DEFAULT_PORT = 3000
const DEFAULT_ENV  = 'dev'

const numberStringSchema = (def: number) => z.coerce.number().default(def).transform(String)

const schema = z.object({
  PORT:     numberStringSchema(DEFAULT_PORT),
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default(DEFAULT_ENV)
})

const parsed = schema.parse(process.env)
export type EnvType = z.infer<typeof schema>

export const config = {
  port: parsed.PORT,
  env:  parsed.NODE_ENV,
  baseUrl: `http://localhost:${parsed.PORT}`,
  appName: 'Express API',
  appVersion: pkg.version,
};