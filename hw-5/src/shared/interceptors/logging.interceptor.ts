import { CallHandler, ExecutionContext, ConsoleLogger, NestInterceptor, Injectable } from '@nestjs/common';
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();

    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    return next.handle().pipe(
      tap(() => this.logger.log(`Handled ${url} ${method} in ${Date.now() - now}ms`))
    )
  }
}