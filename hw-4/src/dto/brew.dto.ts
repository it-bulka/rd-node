import { z } from 'zod'
import { registry } from '@/openapi/registry.ts'

export const brewDto = z.object({
  beans: z.string().min(3).max(40),
  method: z.enum(['v60', 'aeropress', 'chemex', 'espresso']),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().min(1).max(200).optional(),
  brewedAt: z.coerce.date().optional().default(() => new Date()),
})

const brewFull = brewDto.extend({
  id: z.string()
})

export const brewParamsSchema = z.object({
  id: z.string().describe('Brew ID')
})

export const brewQuerySchema = z.object({
  method: z.enum(['v60', 'aeropress', 'chemex', 'espresso']).optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
})

export type BrewDto = z.infer<typeof brewDto>
export type BrewFull = z.infer<typeof brewFull>
export type BrewFilters = z.infer<typeof brewQuerySchema>

registry.register('BrewDto', brewDto)
registry.register('BrewParams', brewParamsSchema)
registry.register('BrewQuery', brewQuerySchema)


