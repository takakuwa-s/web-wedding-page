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

/**
 * format mili second to mm:ss
 * @param milisec 
 * @returns 
 */
export function formatMilisec(milisec: number): string {
  const sec = Math.floor(milisec / 1000);
  const ss = sec % 60;
  const mm = Math.floor(sec / 60) % 60;
  return "mm:ss"
    .replace("mm", mm.toString().padStart(2, '0'))
    .replace("ss", ss.toString().padStart(2, '0'))
}