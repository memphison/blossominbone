/**
 * The database stores time as a display string like "7:00 PM" — these
 * convert to/from the 24-hour "HH:MM" format native <input type="time">
 * elements use. Purely a form-UX concern; the API and schema stay as-is.
 */

/** "19:00" -> "7:00 PM". Returns "" if unparseable. */
export function to12Hour(value24: string): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value24.trim());
  if (!match) return "";

  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${hour}:${minute} ${period}`;
}

/** "7:00 PM" -> "19:00". Returns "" if unparseable (e.g. a stray old free-text value). */
export function to24Hour(display: string): string {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(display.trim());
  if (!match) return "";

  let hour = parseInt(match[1], 10) % 12;
  const minute = match[2];
  if (match[3].toUpperCase() === "PM") hour += 12;

  return `${String(hour).padStart(2, "0")}:${minute}`;
}
