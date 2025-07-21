import { CanActivate } from '@core'
import { ExecutionContext } from '@core/types';
import { UnauthorizedException } from '@core';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): false | true | Promise<boolean> {

    const request = context.switchToHttp().getRequest()
    const xUser = request.headers['x-user']

    if (!xUser) {
      throw new UnauthorizedException('Unauthorized')
    }

    return true
  }
}