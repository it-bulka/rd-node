import { z } from 'zod';
import { CreateTeaSchema } from './create-tea.dto';

export const UpdateTeaSchema = CreateTeaSchema.partial({
  name: true,
  origin: true,
});

export type UpdateTeaDTO = z.infer<typeof UpdateTeaSchema>;
