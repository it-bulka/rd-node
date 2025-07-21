import { z } from 'zod'

export const FilmSchema = z.object({
  id: z.string(),
  name: z.string(),
  year: z.number(),
})

export type FilmDto = z.infer<typeof FilmSchema>