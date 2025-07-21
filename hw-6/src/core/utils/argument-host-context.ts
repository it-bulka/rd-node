import { ArgumentHost } from '../types';
import { Request, Response } from 'express';

export class ArgumentHostContext implements ArgumentHost {
  constructor(
    private readonly req: Request,
    private readonly res: Response,
  ) {}

  switchToHttp() {
    return {
      getRequest: () => this.req,
      getResponse: () => this.res,
    };
  }
}