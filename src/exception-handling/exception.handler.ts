import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ErrorResponse } from '../dto/response';
import { CORRELATION_ID, ERROR_HANDLER } from '../utils/constants';
import {
  createGeneralErrorResponse,
  createSpecificErrorResponse,
  createUnknowError,
  createValidationError,
  handle404Error,
  isGeneralError,
  isSpecificError,
} from './exception.util';
import { ValidationException } from './exceptions';

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  private logger = new Logger(ERROR_HANDLER);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const correlationId = ctx.getRequest().headers[CORRELATION_ID];

    let errorResponse: ErrorResponse;

    if (isSpecificError(exception)) {
      errorResponse = createSpecificErrorResponse(exception);
    } else if (isGeneralError(exception)) {
      errorResponse = createGeneralErrorResponse(exception);
    } else if (exception instanceof ValidationException) {
      errorResponse = createValidationError(exception);
    } else if (exception.status === 404) {
      errorResponse = handle404Error(exception.message);
    } else {
      errorResponse = createUnknowError();
    }

    const log: Record<string, any> = {
      correlationId,
      payload: errorResponse.payload,
    };

    if (HttpStatus.INTERNAL_SERVER_ERROR === errorResponse.httpStatus) {
      log.stack = exception.stack;
    }
    this.logger.error(JSON.stringify(log, null, 4));

    response.status(errorResponse.httpStatus).json({
      httpStatus: errorResponse.httpStatus,
      payload: errorResponse.payload,
    });
  }
}
