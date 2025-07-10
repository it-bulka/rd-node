import { Request } from 'express';
export type Paramtype = 'body' | 'query' | 'param' | 'header' | 'cookie' | 'file' | 'files';

export const extractParams = (req: Request, type: Paramtype) => {
  switch (type) {
    case 'body':
      return req.body;
    case 'query':
      return req.query;
    case 'param':
      return req.params;
    case 'header':
      return req.headers;
    case 'cookie':
      return req.cookies;
    case 'file':
      return (req as any).file;
    case 'files':
      return (req as any).files;
    default:
      throw new Error(`Unknown param type: ${type}`);
  }
}