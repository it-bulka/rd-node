import { CanActivate, ExecutionContext, Type, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

type Roles = 'admin' | 'creator'

export function RoleGuard(roles: Roles | Roles[]): Type<CanActivate> {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest<Request>();
      const xUser = req.headers['x-user']
      console.log('xUser', xUser)

      const hasRoles = Array.isArray(roles) ? roles.length > 0 : !!roles;
      if(hasRoles && (!xUser || typeof xUser !== 'string')) {
        throw new ForbiddenException('Access denied');
      }

      req.user = xUser as string;
      return true;
    }
  }

  return RoleGuardMixin
}