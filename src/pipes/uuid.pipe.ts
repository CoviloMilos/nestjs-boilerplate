import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { BadRequestException } from '../exception-handling';
import { INVALID_UUID_FORMAT_ERROR } from '../utils/constants';
import { HelperService } from '../utils/helpers';

@Injectable()
export class UuidValidator implements PipeTransform {
  transform(value: any) {
    if (!HelperService.isValidUuid(value))
      throw new BadRequestException(INVALID_UUID_FORMAT_ERROR);
    return value;
  }
}
