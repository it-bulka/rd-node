import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

export const AUTH_REFLECT_TOKEN = 'isPublic';
const X_API_KEY = 'im_rd_student';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean | undefined>(
      AUTH_REFLECT_TOKEN,
      context.getHandler(),
    );

    if (isPublic) return true;

    return this._checkXApiKey(context);
  }

  _checkXApiKey(context: ExecutionContext) {
    const httpCtx = context.switchToHttp();
    const req = httpCtx.getRequest<Request>();

    const xApiKey = req.headers['x-api-key'];
    return xApiKey === X_API_KEY;
  }
}
