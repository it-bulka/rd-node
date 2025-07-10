import type { Request, Response, NextFunction } from 'express'
import { runGuards, GuardType } from '@core/decorators'

export const GuardsMiddleware = (
  ctrl: Function,
  handler: Function,
  globalGuards: GuardType[]
) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const guardResult = await runGuards(ctrl, handler, req, res, globalGuards);
    if (typeof guardResult !== 'string') {
      return next();
    }
    res.status(403).json({message: `Forbidden by ${guardResult}`});
  }