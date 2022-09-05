import { HttpException, HttpStatus } from '@nestjs/common';
import {
  DefaultErrorPayload,
  FieldErrorPayload,
  FormFieldsErrorPayload,
  InvalidFormLogicErrorPayload,
} from '../../dto/response';

export abstract class BaseException extends HttpException {
  _httpStatus: HttpStatus;

  protected constructor(httpStatus: HttpStatus) {
    super('', httpStatus);
    this._httpStatus = httpStatus;
  }

  abstract getPayload():
    | DefaultErrorPayload
    | FieldErrorPayload
    | FormFieldsErrorPayload
    | InvalidFormLogicErrorPayload;
}
