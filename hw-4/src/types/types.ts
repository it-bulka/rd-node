import { Request, Response, NextFunction } from 'express'

export type Controller<Params = any, ResBody = any, ReqBody = any, ReqQuery = any> = (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => any

export type ResponseBody<T = unknown, K extends string = string> = { success: boolean } & ({ data: T } | { error: K })
