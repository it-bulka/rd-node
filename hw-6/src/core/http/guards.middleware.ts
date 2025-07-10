import type { Request, Response, NextFunction } from 'express'

export const GuardsMiddleware = (handler: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
  //TODO: handle guards
  }