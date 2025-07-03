import { Controller } from './types.js'
import { ZodType } from 'zod'

export type ValidateFn = (schema: ZodType) => Controller