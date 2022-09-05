import * as moment from 'moment';

export class DateHelper {
  static timeDiffInDays(value: Date): number {
    return moment().diff(value, 'd');
  }

  static getWeekAgoDate(): moment.Moment {
    return moment().subtract(7, 'd');
  }
}
