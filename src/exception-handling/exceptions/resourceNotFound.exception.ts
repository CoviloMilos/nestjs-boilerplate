import { HttpStatus } from '@nestjs/common';
import {
  DefaultErrorPayload,
  FieldErrorPayload,
  FormFieldsErrorPayload,
  InvalidFormLogicErrorPayload,
} from '../../dto/response';
import { BaseException } from './base.exception';

export class ResourceNotFoundException extends BaseException {
  private readonly _message: string;

  constructor(resource: string) {
    super(HttpStatus.NOT_FOUND);
    this._message = `Resource ${resource} not found`;
  }

  getPayload():
    | DefaultErrorPayload
    | FieldErrorPayload
    | FormFieldsErrorPayload
    | InvalidFormLogicErrorPayload {
    return {
      message: this._message,
    };
  }
}
