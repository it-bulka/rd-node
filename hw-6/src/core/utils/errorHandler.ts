import { Request, Response, NextFunction } from 'express';
import { HttpException } from '@core/exceptions/httpException';

export const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const msg = err.response || { message: err.message || 'Internal Server Error' }
  return res.status(err.statusCode || 500).json(msg)
}