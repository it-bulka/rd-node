import 'express'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'


declare module 'express-serve-static-core' {
  interface Request {
    validatedQuery?: BrewQuery
  }
}


declare global {
  var registry: OpenAPIRegistry
}