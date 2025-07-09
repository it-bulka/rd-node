import { StatusCodes } from 'http-status-codes'
import { HttpException, type HttpExceptionArgs } from './httpException';

export class BadRequestException extends HttpException {
  constructor(...args: HttpExceptionArgs) {
    const [res, statusCode, options] = args
    super(res, statusCode || StatusCodes.BAD_REQUEST, options)

    this.response = this.applyErrToRes(res, 'Bad Request')
  }
}

export class UnauthorizedException extends HttpException {
  constructor(...args: HttpExceptionArgs) {
    const [res, statusCode, options] = args
    super(res, statusCode || StatusCodes.UNAUTHORIZED, options)

    this.response = this.applyErrToRes(res, 'Unauthorized')
  }
}

export class ForbiddenException extends HttpException {
  constructor(...args: HttpExceptionArgs) {
    const [res, statusCode, options] = args
    super(res, statusCode || StatusCodes.FORBIDDEN, options)

    this.response = this.applyErrToRes(res, 'Forbidden')
  }
}

export class NotFoundException extends HttpException {
  constructor(...args: HttpExceptionArgs) {
    const [res, statusCode, options] = args
    super(res, statusCode || StatusCodes.NOT_FOUND, options)

    this.response = this.applyErrToRes(res, 'Not Found')
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(...args: HttpExceptionArgs) {
    const [res, statusCode, options] = args
    super(res, statusCode || StatusCodes.TOO_MANY_REQUESTS, options)

    this.response = this.applyErrToRes(res, 'Too Many Requests')
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(...args: HttpExceptionArgs) {
    const [res, statusCode, options] = args
    super(res, statusCode || StatusCodes.INTERNAL_SERVER_ERROR, options)

    this.response = this.applyErrToRes(res, 'InternalServerError')
  }
}