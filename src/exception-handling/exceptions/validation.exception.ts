import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import {
  DefaultErrorPayload,
  FieldErrorPayload,
  FormFieldsErrorPayload,
  InvalidFormLogicErrorPayload,
} from '../../dto/response';

export class ValidationException extends BaseException {
  private readonly _fields: FieldErrorPayload[];

  constructor(fields: FieldErrorPayload[]) {
    super(HttpStatus.BAD_REQUEST);
    this._fields = fields;
  }

  public getPayload():
    | DefaultErrorPayload
    | FieldErrorPayload
    | FormFieldsErrorPayload
    | InvalidFormLogicErrorPayload {
    return {
      fields: this._fields,
    };
  }
}
