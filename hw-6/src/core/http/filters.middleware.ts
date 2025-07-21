import type { Request, Response, NextFunction } from 'express'
import { runFilters, FilterType } from '../decorators/use-filters';

export const FiltersMiddleware = (
  controllerClass: Function,
  handlerChain: Array<(req: Request, res: Response, next: NextFunction) => Promise<any>>,
  globalFilters: FilterType[]
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const handler of handlerChain) {
        await handler(req, res, next)
      }
    } catch (err) {
      await runFilters(controllerClass, handlerChain.at(-1)!, req, res, err, globalFilters)
      next(err)
    }
  }
}