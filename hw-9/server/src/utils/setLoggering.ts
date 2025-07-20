import * as morgan from 'morgan';
import pinoHttp from 'pino-http';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

export const setLoggering = (app: NestExpressApplication) => {
  const isDev = process.env.NODE_ENV === 'development';

  const expressApp = app.getHttpAdapter().getInstance();

  if (isDev) {
    expressApp.use(morgan('dev'));
    Logger.log('Morgan middleware enabled (development mode)');
  } else {
    expressApp.use(pinoHttp());
    Logger.log('Pino middleware enabled (production mode)');
  }
}