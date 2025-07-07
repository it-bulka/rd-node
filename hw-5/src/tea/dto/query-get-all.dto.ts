import { z } from 'zod';

export const QueryGetAllSchema = z.object({
  minRating: z.coerce
    .number({ invalid_type_error: 'minRating must be a number' })
    .min(1, { message: 'minRating must be at least 1' })
    .optional(),
  pageSize: z.coerce
    .number({ invalid_type_error: 'pageSize must be a number' })
    .min(1, { message: 'pageSize must be at least 1' })
    .optional(),
  page: z.coerce
    .number({ invalid_type_error: 'page must be a number' })
    .min(1, { message: 'page must be at least 1' })
    .optional(),
});

export type QueryGetAllDto = z.infer<typeof QueryGetAllSchema>;
