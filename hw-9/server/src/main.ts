import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { STATIC_FOLDER_NAME, STATIC_FOLDER_PREFIX } from '@/consts';
import { setLoggering } from '@/utils';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  setLoggering(app)
  app.enableCors({
    origin: config.getOrThrow('CLIENT_ORIGIN'),
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, X-User',
    maxAge: 600, // cash preflight for 10 min
  })
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

  const PORT = config.getOrThrow('PORT') ?? 3000
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
bootstrap();
