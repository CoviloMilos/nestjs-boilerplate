import * as moment from 'moment';

export class DateHelper {
  static timeDiffInDays(value: Date): number {
    return moment().diff(value, 'd');
  }
}
