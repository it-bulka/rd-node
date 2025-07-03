import { ValidateFn } from '../types/validates'

export const validate: ValidateFn = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)
  if(!result.success) {
    return res.status(400).json({ errors: result.error.format() })
  }

  req.body = result.data
  next()
}