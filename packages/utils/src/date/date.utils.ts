import { DateTime } from 'luxon';

export const formatDateToString = (date: Date) => {
  return DateTime.fromJSDate(date).toFormat('yyyy.MM.dd');
};
