import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodSerializationException } from 'nestjs-zod';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = exception.getResponse();
    const responseBody =
      typeof errorResponse === 'string'
        ? { message: errorResponse }
        : errorResponse;
    if (exception instanceof ZodSerializationException) {
      const zodError = exception.getZodError();
      this.logger.error(`ZodSerializationException: ${zodError.message}`);
    }
    return response.status(status).json({
      ...responseBody,
      timestamp: new Date().toISOString(),
      statusCode: responseBody['statusCode']
        ? responseBody['statusCode']
        : status,
    });
  }
}
