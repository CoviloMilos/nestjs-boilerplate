import { HttpStatus } from '@nestjs/common';

import { BaseException } from '../base.exception';

import {
  DefaultErrorPayload,
  FieldErrorPayload,
  FormFieldsErrorPayload,
  InvalidFormLogicErrorPayload,
} from '../../../dto/response';

export class UserAlreadyExistException extends BaseException {
  private readonly _message: string;

  private readonly _field: string;

  constructor(value: string, field = 'email') {
    super(HttpStatus.BAD_REQUEST);
    this._field = field;
    this._message = `Email ${value} already exist`;
  }

  public getPayload():
    | DefaultErrorPayload
    | FieldErrorPayload
    | FormFieldsErrorPayload
    | InvalidFormLogicErrorPayload {
    return {
      formMessage: this._message,
      fields: [
        {
          field: this._field,
          message: this._message,
        },
      ],
    };
  }
}
