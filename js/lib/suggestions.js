import { sanitizeInteger, sanitizeSearchTerm } from "./sanitize.js";

function hashString(value) {
  let hash = 2166136261;
  const text = String(value ?? "");
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRng(seed) {
  let state = seed >>> 0;
  return function random() {
    state += 0x6d2b79f5;
    let next = state;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function uniqueSanitizedTerms(words) {
  const seen = new Set();
  const unique = [];
  if (!Array.isArray(words)) {
    return unique;
  }
  for (const word of words) {
    const term = sanitizeSearchTerm(word);
    if (!term || seen.has(term)) {
      continue;
    }
    seen.add(term);
    unique.push(term);
  }
  return unique;
}

/**
 * Local-only, deterministic daily suggestions.
 * Does not fetch, open, or search — callers may only display or copy text.
 */
export function suggestTerms(words, { dateKey = "1970-01-01", offset = 0, count = 8 } = {}) {
  const pool = uniqueSanitizedTerms(words);
  const take = sanitizeInteger(count, { min: 0, max: pool.length, fallback: 0 });
  if (take === 0) {
    return [];
  }

  const seed = hashString(`${dateKey}:${sanitizeInteger(offset, { min: 0, max: 1_000_000 })}`);
  const random = createRng(seed);
  const shuffled = pool.slice();
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapWith = Math.floor(random() * (index + 1));
    const current = shuffled[index];
    shuffled[index] = shuffled[swapWith];
    shuffled[swapWith] = current;
  }
  return shuffled.slice(0, take);
}
