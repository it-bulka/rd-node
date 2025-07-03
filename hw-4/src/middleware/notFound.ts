import type { Controller } from '@/types/types.ts'

export const notFound: Controller = (_req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Route Not Found',
  })

  next()
}