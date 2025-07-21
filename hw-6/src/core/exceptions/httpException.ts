import { StatusCodes } from 'http-status-codes'
export type StatusCode = (typeof StatusCodes)[keyof typeof StatusCodes]

export type HttpExceptionRes =
  | { message: string, statusCode: number }
  | Record<string, any>
  | string

export type HttpExceptionCause = { cause?: unknown }

export type HttpExceptionArgs = [
  response: HttpExceptionRes,
  statusCode: StatusCode,
  options?: HttpExceptionCause
]

export class HttpException extends Error {
  response: HttpExceptionRes
  statusCode: StatusCode

  constructor(...args: HttpExceptionArgs) {
    const [response, statusCode, option ] = args
    super(typeof response === 'string' ? response : response.message ?? 'Http Exception');

    this.response = response
    this.statusCode = statusCode
    this.cause = option?.cause
  }

  protected applyErrToRes(response: HttpExceptionRes, errorName: string) {
    if(typeof response === 'string') {
      return { error: errorName, message: response }
    }

    return this.response = { error: errorName, ...response }
  }
}