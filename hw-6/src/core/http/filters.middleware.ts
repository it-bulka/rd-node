import type { Request, Response, NextFunction } from 'express'

export const FiltersMiddleware = (handler: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    //TODO: handle filters
  }