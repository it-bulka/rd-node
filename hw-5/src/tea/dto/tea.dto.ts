import { z } from 'zod';
import { CreateTeaSchema } from './create-tea.dto';
import { createZodDto } from 'nestjs-zod';

export const TeaSchema = CreateTeaSchema.extend({
  id: z.string().min(32).max(32)
})

export class TeaDto extends createZodDto(TeaSchema) {}
