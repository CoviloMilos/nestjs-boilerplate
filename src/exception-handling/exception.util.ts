import { HttpStatus } from '@nestjs/common';
import { ErrorResponse } from '../dto/response';
import {
  BadRequestException,
  BaseException,
  ResourceNotFoundException,
  UserAlreadyExistException,
  ValidationException,
} from './exceptions';

export const isGeneralError = (exception) =>
  exception instanceof ResourceNotFoundException ||
  exception instanceof BadRequestException;

export const isSpecificError = (exception) =>
  exception instanceof UserAlreadyExistException;

export const createSpecificErrorResponse = <T extends BaseException>(
  exception: T,
): ErrorResponse => {
  return {
    httpStatus: exception._httpStatus,
    payload: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      formMessage: exception.getPayload().formMessage || 'Invalid form',
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      fields: exception.getPayload().fields || [],
    },
  };
};
export const createGeneralErrorResponse = <T extends BaseException>(
  exception: T,
): ErrorResponse => {
  return {
    httpStatus: exception._httpStatus,
    payload: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      message: exception.getPayload().message,
    },
  };
};

export const createValidationError = (
  exception: ValidationException,
): ErrorResponse => {
  return {
    httpStatus: exception._httpStatus,
    payload: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      fields: exception.getPayload().fields,
    },
  };
};

export const handle404Error = (message: string): ErrorResponse => {
  return {
    httpStatus: HttpStatus.NOT_FOUND,
    payload: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      message: message,
    },
  };
};

export const createUnknowError = (): ErrorResponse => {
  return {
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
    payload: {
      message: 'Unexpected error!',
    },
  };
};
