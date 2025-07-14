import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api',{
      exclude: [{ path: 'docs', method: RequestMethod.ALL}],
    });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
