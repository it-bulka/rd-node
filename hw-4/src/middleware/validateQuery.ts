import { ValidateFn } from '../types/validates'

export const validateQuery: ValidateFn = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query)
  if(!result.success) {
    return res.status(400).json({ error: result.error.flatten(), where: 'query' })
  }

  /**
   * req.query is getter, not setter
   * req.query automatically transform data into string even number
   * */
  (req as any).validatedQuery = result.data
  next()
}