import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from '@interceptors/logging.interceptor';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import * as compression from 'compression';
import { rateLimitConfig } from './config/rate-limit-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet())
  app.use(rateLimit(rateLimitConfig))
  app.use(compression())

  app.useGlobalInterceptors(app.get(LoggingInterceptor))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
