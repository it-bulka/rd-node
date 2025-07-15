import { CanActivate, ExecutionContext, Type, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

type Roles = 'admin'

export function RoleGuard(role?: Roles): Type<CanActivate> {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest<Request>();
      const xUser = req.headers['x-user']

      if (role === 'admin' && !xUser) {
        throw new ForbiddenException('Access denied: Admins only');
      }

      return true;
    }
  }

  return RoleGuardMixin
}