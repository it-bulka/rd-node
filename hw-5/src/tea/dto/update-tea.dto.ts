import { z } from 'zod';
import { CreateTeaSchema } from './create-tea.dto';
import { createZodDto } from 'nestjs-zod';

export const UpdateTeaSchema = CreateTeaSchema.partial({
  name: true,
  origin: true,
});

export type UpdateTea = z.infer<typeof UpdateTeaSchema>;
export class UpdateTeaDTO extends createZodDto(UpdateTeaSchema) {}
