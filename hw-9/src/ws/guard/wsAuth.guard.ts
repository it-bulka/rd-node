import { CanActivate, ExecutionContext } from '@nestjs/common';

export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const user = client.handshake.headers['x-user'];
    if(!user) return true;

    client.data.user = user;
    return true;
  }
}