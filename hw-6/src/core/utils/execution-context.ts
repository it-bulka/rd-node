import { ExecutionContext } from '@core/types'
import { Request, Response } from 'express'
import { ArgumentHostContext } from './argument-host-context';

export class ExpressExecutionContext extends ArgumentHostContext implements ExecutionContext {
  constructor(
    private readonly targetClass: Function,
    private readonly targetHandler: Function,
    req: Request,
    res: Response,
  ) {
    super(req, res)
  }

  getClass(): Function {
    return this.targetClass;
  }

  getHandler(): Function {
    return this.targetHandler;
  }
}