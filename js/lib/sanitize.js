/**
 * Input hygiene for the dashboard. Untrusted strings must never reach HTML.
 */

export const MAX_TERM_LENGTH = 120;
export const MAX_NOTES_LENGTH = 400;
export const MAX_COUNTER = 9999;

function asString(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value);
}

export function escapeHtml(value) {
  return asString(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function stripUnsafeText(value, maxLength) {
  let text = asString(value);
  text = text.replace(/<[^>]*>/g, "");
  text = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  text = text.replace(/javascript:/gi, "");
  text = text.replace(/data:/gi, "");
  text = text.replace(/\s+/g, " ").trim();
  if (text.length > maxLength) {
    text = text.slice(0, maxLength).trim();
  }
  return text;
}

export function sanitizeSearchTerm(value) {
  return stripUnsafeText(value, MAX_TERM_LENGTH);
}

export function sanitizePlainText(value, maxLength = MAX_NOTES_LENGTH) {
  const limit = Number.isFinite(maxLength) ? maxLength : MAX_NOTES_LENGTH;
  return stripUnsafeText(value, Math.max(0, limit));
}

export function sanitizeInteger(value, { min = 0, max = MAX_COUNTER, fallback = 0 } = {}) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  const numeric = typeof value === "number" ? value : Number(asString(value).trim());
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  const truncated = Math.trunc(numeric);
  return Math.min(max, Math.max(min, truncated));
}
