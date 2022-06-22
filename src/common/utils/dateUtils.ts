/**
 * format Date
 * @param format the date format like yyyy/MM/dd HH:mm:ss
 * @param date date
 * @returns 
 */
export function formatDatetime(format: string, date: Date): string {
  const d = new Date(date);
  return format
    .replace("yyyy", d.getFullYear().toString())
    .replace("MM", (d.getMonth() + 1).toString())
    .replace("dd", d.getDate().toString())
    .replace("HH", d.getHours().toString().padStart(2, '0'))
    .replace("mm", d.getMinutes().toString().padStart(2, '0'))
    .replace("ss", d.getSeconds().toString().padStart(2, '0'))
}