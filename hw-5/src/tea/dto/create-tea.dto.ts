import { z } from 'zod';

export const CreateTeaSchema = z.object({
  name: z.string().min(3).max(40),
  origin: z.string().min(3).max(30),
  rating: z.number().min(1).max(20).optional(),
  brewTemp: z.number().min(60).max(100).optional(),
  notes: z.string().max(150).optional(),
});

export type CreateTeaDto = z.infer<typeof CreateTeaSchema>;
