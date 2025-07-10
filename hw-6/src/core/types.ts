import type { Request, Response } from 'express';

export type Paramtype = 'body' | 'query' | 'param' | 'header' | 'cookie' | 'file' | 'files';

export interface ClassType<T = any> extends Function {
  new (...args: any[]): T;
}

export type Token = string | Symbol | Function

export type Provider =
  | { useClass: ClassType, provider: Token }   // provider = key (token) for search
  | { useValue: any, provider: Token }

// for root container
export type InstanceWrapper<T = any> = {
  instance?: T
  isResolved?: boolean                    // if instance created
  isController?: boolean                  // needed for http
} & Provider

export type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete'
export type ModuleType = {
  controllers: ClassType[],
  providers: (Provider | ClassType)[],
  imports?: ModuleType[],
  exports: ModuleType[]
}

export type RoutesMetadata = {
  method: Methods,
  path: string,
  handlerName: string
}[]

export interface ArgumentMetadata {
  readonly index: number;             // args index in method
  readonly type: Paramtype;           // location
  readonly metatype?: ClassType       // TS-type (if exists)
  readonly data?: string;             // @Body('userId') → 'userId'
  readonly name?: string;             // propertyKey of method
}

export interface ArgumentHost {
  switchToHttp: () => {
    getRequest: () => Request
    getResponse: () => Response
  }
}

export interface ExecutionContext extends ArgumentHost{
  getClass(): Function
  getHandler(): Function
}
