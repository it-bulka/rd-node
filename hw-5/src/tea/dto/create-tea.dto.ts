import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreateTeaSchema = z.object({
  name: z.string().min(3).max(40),
  origin: z.string().min(3).max(30),
  rating: z.number().min(1).max(20).optional(),
  brewTemp: z.number().min(60).max(100).optional(),
  notes: z.string().max(150).optional(),
});

export type CreateTea = z.infer<typeof CreateTeaSchema>;
export class CreateTeaDto extends createZodDto(CreateTeaSchema) {}
