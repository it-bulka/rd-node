import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) => {
  const msg = { message: err.message || 'Internal Server Error' }
  return res.status(err.status || 500).json(msg)
}