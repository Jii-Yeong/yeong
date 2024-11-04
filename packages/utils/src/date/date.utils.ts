import { DateTime } from 'luxon';

export const transferStringToDate = (value: string, format = 'yyyy-MM-dd') => {
  return DateTime.fromFormat(value, format).toJSDate();
};

export const formatDateToString = (date: Date) => {
  return DateTime.fromJSDate(date).toFormat('yyyy.MM.dd');
};
