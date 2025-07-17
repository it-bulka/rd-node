import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { STATIC_FOLDER_NAME, STATIC_FOLDER_PREFIX } from '@/consts';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors()
  app.setGlobalPrefix('api',{
      exclude: [
        { path: 'docs', method: RequestMethod.ALL },
        { path: 'static', method: RequestMethod.GET }
      ],
    });
  app.useStaticAssets(join(__dirname, STATIC_FOLDER_NAME), {
    prefix: '/' + STATIC_FOLDER_PREFIX,
  })

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
