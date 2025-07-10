import type { Request, Response, NextFunction } from 'express'

export const PipeMiddleware = (handler: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    //TODO: handle pipes
  }