import { z } from 'zod';
import { CreateTeaSchema } from '../dto/create-tea.dto';

export const TeaSchema = CreateTeaSchema.extend({
  id: z.string().length(32),
});

export type Tea = z.infer<typeof TeaSchema>;
