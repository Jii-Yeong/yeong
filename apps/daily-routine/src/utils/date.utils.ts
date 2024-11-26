import { DateTime } from "luxon"

export const DATE_FORMAT = {
  default: "YYYY-MM-DD",
} as const

export const parseDateToFormat = (
  date: string,
  format = DATE_FORMAT.default
) => {
  return DateTime.fromISO(date).toLocaleString()
}
