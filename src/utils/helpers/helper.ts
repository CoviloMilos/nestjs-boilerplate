import { UUID_V1_PATTERN } from '../constants';

export class HelperService {
  static isValidUuidV1(value: string) {
    return UUID_V1_PATTERN.test(value);
  }
}
