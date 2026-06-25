import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload =
      exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
    res.status(status).json({
      statusCode: status,
      message: typeof payload === 'string' ? payload : (payload as any).message,
      error: typeof payload === 'object' ? (payload as any).error : undefined,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
