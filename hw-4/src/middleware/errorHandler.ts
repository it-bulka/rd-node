import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = async (err, req, res, _next) => {
  res.status(err.status || 400).json({
    success: false,
    error: err.message || 'Internal Server Error'
  })
}