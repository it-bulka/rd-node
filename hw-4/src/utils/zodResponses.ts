import { z, ZodTypeAny } from 'zod'

export const SuccessResponse = <T extends ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
  })

export const ErrorResponse = (where?: string) => {
  const base = {
    success: z.literal(false),
    error: z.union([
      z.string(),
      z.object({ message: z.string() })
    ]),
  }

  if (where) {
    return z.object({
      ...base,
      where: z.literal(where)
    })
  }

  return z.object(base)
}
