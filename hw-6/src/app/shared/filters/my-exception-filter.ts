import { ArgumentHost, ExceptionFilter, HttpException } from '@core';

export class MyExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host:ArgumentHost) {
    console.log('[ Exception Filter Logger ]', 'status:', exception.statusCode, 'message:', exception.response || exception.message);
  }
}