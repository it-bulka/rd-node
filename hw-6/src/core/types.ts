import type { Request, Response } from 'express';

export type Paramtype = 'body' | 'query' | 'param' | 'header' | 'cookie' | 'file' | 'files';

export interface ClassType<T = any> extends Function {
  new (...args: any[]): T;
}

export interface ArgumentMetadata {
  readonly index: number;             // args index in method
  readonly type: Paramtype;           // location
  readonly metatype?: ClassType       // TS-type (if exists)
  readonly data?: string;             // @Body('userId') → 'userId'
  readonly name?: string;             // propertyKey of method
}

export interface ArgumentHost {
  switchToHttp() : {
    getRequest() : Request
    getResponse() : Response
  }
}

export interface ExecutionContext extends ArgumentHost{
  getClass(): Function
  getHandler(): Function
}