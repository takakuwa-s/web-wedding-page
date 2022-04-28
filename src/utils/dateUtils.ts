import { t } from "i18next";

/**
 * format Date
 * @param format the date format like yyyyMMdd WWW
 * @param date Date type 
 * @returns 
 */
export function formatDate(format: string, date: Date): string {
  return format
            .replace("yyyy", date.getFullYear().toString())
            .replace("MM", (date.getMonth() + 1).toString())
            .replace("dd", date.getDate().toString())
            .replace("WWW", t("common.dayOfWeek." + date.getDay().toString()));
}

/**
 * format Date
 * @param format the date format like dd days HH:mm:ss
 * @param day day of week
 * @param hour hour of day
 * @param min minute of hour
 * @param sec second of minute
 * @returns 
 */
 export function formatDatetime(format: string, day: number, hour: number, min: number, sec: number): string {
  return format
            .replace("dd", day.toString())
            .replace("HH", hour.toString().padStart(2, '0'))
            .replace("mm", min.toString().padStart(2, '0'))
            .replace("ss", sec.toString().padStart(2, '0'))
}