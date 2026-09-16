/**
 * Local calendar helpers for privacy-first daily resets.
 * Uses the runtime IANA timezone so midnight and travel/DST stay correct.
 */

const DATE_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export function getCurrentTimeZone(resolvedOptions = Intl.DateTimeFormat().resolvedOptions()) {
  const timeZone = resolvedOptions?.timeZone;
  return typeof timeZone === "string" && timeZone.length > 0 ? timeZone : "UTC";
}

export function isValidDateKey(value) {
  if (typeof value !== "string" || !DATE_KEY_PATTERN.test(value)) {
    return false;
  }
  const [, year, month, day] = value.match(DATE_KEY_PATTERN);
  const y = Number(year);
  const m = Number(month);
  const d = Number(day);
  if (m < 1 || m > 12 || d < 1 || d > 31) {
    return false;
  }
  const probe = new Date(Date.UTC(y, m - 1, d));
  return (
    probe.getUTCFullYear() === y &&
    probe.getUTCMonth() === m - 1 &&
    probe.getUTCDate() === d
  );
}

export function getLocalDateString(date = new Date(), timeZone = getCurrentTimeZone()) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("getLocalDateString requires a valid Date");
  }
  if (typeof timeZone !== "string" || timeZone.length === 0) {
    throw new TypeError("getLocalDateString requires a time zone");
  }

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const dateKey = `${year}-${month}-${day}`;

  if (!isValidDateKey(dateKey)) {
    throw new Error("Unable to format a local calendar date");
  }
  return dateKey;
}

export function hasCalendarDayChanged(storedDateKey, now = new Date(), timeZone = getCurrentTimeZone()) {
  if (!isValidDateKey(storedDateKey)) {
    return true;
  }
  return storedDateKey !== getLocalDateString(now, timeZone);
}
