import { getCurrentTimeZone, getLocalDateString, hasCalendarDayChanged, isValidDateKey } from "./date.js";
import { sanitizeInteger, sanitizePlainText } from "./sanitize.js";

export const STORAGE_KEY = "dailyProgress";

export const LEGACY_EXTENSION_STORAGE_KEYS = Object.freeze([
  "searchState",
  "autoStartSettings",
  "trendingWordsCache",
  "lastCompletedDate",
]);

export const LEGACY_LOCAL_STORAGE_KEYS = Object.freeze([
  "desktopSearches",
  "mobileSearches",
  "millisecondsMin",
  "millisecondsMax",
  "scheduleStartTime",
  "scheduleEndTime",
  "autoStartEnabled",
  "autoStartTime",
]);

export const DEFAULT_GOALS = Object.freeze({
  dailyPointsGoal: 90,
  desktopSearchGoal: 30,
  mobileSearchGoal: 20,
});

function cloneGoals(source) {
  return {
    dailyPointsGoal: sanitizeInteger(source?.dailyPointsGoal, {
      fallback: DEFAULT_GOALS.dailyPointsGoal,
    }),
    desktopSearchGoal: sanitizeInteger(source?.desktopSearchGoal, {
      fallback: DEFAULT_GOALS.desktopSearchGoal,
    }),
    mobileSearchGoal: sanitizeInteger(source?.mobileSearchGoal, {
      fallback: DEFAULT_GOALS.mobileSearchGoal,
    }),
  };
}

export function createEmptyDay(dateKey, timeZone, previous) {
  if (!isValidDateKey(dateKey)) {
    throw new TypeError("createEmptyDay requires a YYYY-MM-DD date key");
  }
  const goals = cloneGoals(previous);
  return {
    dateKey,
    timeZone: typeof timeZone === "string" && timeZone ? timeZone : getCurrentTimeZone(),
    pointsEarned: 0,
    desktopSearchesDone: 0,
    mobileSearchesDone: 0,
    notes: "",
    suggestionOffset: 0,
    updatedAt: 0,
    ...goals,
  };
}

export function normalizeProgress(raw, now = new Date(), timeZone = getCurrentTimeZone()) {
  const today = getLocalDateString(now, timeZone);
  if (!raw || typeof raw !== "object") {
    return {
      progress: createEmptyDay(today, timeZone),
      didReset: true,
      reason: "missing",
    };
  }

  if (hasCalendarDayChanged(raw.dateKey, now, timeZone)) {
    const next = createEmptyDay(today, timeZone, raw);
    next.updatedAt = now.getTime();
    return {
      progress: next,
      didReset: true,
      reason: "calendar-day-change",
    };
  }

  const progress = {
    ...createEmptyDay(today, timeZone, raw),
    pointsEarned: sanitizeInteger(raw.pointsEarned),
    desktopSearchesDone: sanitizeInteger(raw.desktopSearchesDone),
    mobileSearchesDone: sanitizeInteger(raw.mobileSearchesDone),
    notes: sanitizePlainText(raw.notes),
    suggestionOffset: sanitizeInteger(raw.suggestionOffset, { min: 0, max: 1_000_000 }),
    updatedAt: sanitizeInteger(raw.updatedAt, { min: 0, max: Number.MAX_SAFE_INTEGER, fallback: now.getTime() }),
    timeZone,
  };

  return {
    progress,
    didReset: false,
    reason: raw.timeZone && raw.timeZone !== timeZone ? "timezone-updated" : null,
  };
}

export function applyUserUpdate(progress, patch = {}, now = new Date()) {
  const next = { ...progress };
  if (Object.hasOwn(patch, "pointsEarned")) {
    next.pointsEarned = sanitizeInteger(patch.pointsEarned);
  }
  if (Object.hasOwn(patch, "desktopSearchesDone")) {
    next.desktopSearchesDone = sanitizeInteger(patch.desktopSearchesDone);
  }
  if (Object.hasOwn(patch, "mobileSearchesDone")) {
    next.mobileSearchesDone = sanitizeInteger(patch.mobileSearchesDone);
  }
  if (Object.hasOwn(patch, "dailyPointsGoal")) {
    next.dailyPointsGoal = sanitizeInteger(patch.dailyPointsGoal);
  }
  if (Object.hasOwn(patch, "desktopSearchGoal")) {
    next.desktopSearchGoal = sanitizeInteger(patch.desktopSearchGoal);
  }
  if (Object.hasOwn(patch, "mobileSearchGoal")) {
    next.mobileSearchGoal = sanitizeInteger(patch.mobileSearchGoal);
  }
  if (Object.hasOwn(patch, "notes")) {
    next.notes = sanitizePlainText(patch.notes);
  }
  if (Object.hasOwn(patch, "suggestionOffset")) {
    next.suggestionOffset = sanitizeInteger(patch.suggestionOffset, {
      min: 0,
      max: 1_000_000,
    });
  }
  next.updatedAt = now.getTime();
  return next;
}

export function incrementCounter(progress, field, amount = 1, now = new Date()) {
  const allowed = new Set([
    "pointsEarned",
    "desktopSearchesDone",
    "mobileSearchesDone",
  ]);
  if (!allowed.has(field)) {
    throw new TypeError(`Cannot increment ${field}`);
  }
  const delta = sanitizeInteger(amount, { min: -9999, max: 9999, fallback: 0 });
  return applyUserUpdate(
    progress,
    { [field]: sanitizeInteger(progress[field]) + delta },
    now,
  );
}

export function computeStatus(progress) {
  const pointsEarned = sanitizeInteger(progress?.pointsEarned);
  const dailyPointsGoal = sanitizeInteger(progress?.dailyPointsGoal);
  const desktopDone = sanitizeInteger(progress?.desktopSearchesDone);
  const mobileDone = sanitizeInteger(progress?.mobileSearchesDone);
  const desktopGoal = sanitizeInteger(progress?.desktopSearchGoal);
  const mobileGoal = sanitizeInteger(progress?.mobileSearchGoal);

  const missingPoints = Math.max(0, dailyPointsGoal - pointsEarned);
  const remainingDesktop = Math.max(0, desktopGoal - desktopDone);
  const remainingMobile = Math.max(0, mobileGoal - mobileDone);
  const creditedDesktop = Math.min(desktopDone, desktopGoal);
  const creditedMobile = Math.min(mobileDone, mobileGoal);
  const searchGoal = desktopGoal + mobileGoal;
  const searchDone = creditedDesktop + creditedMobile;

  let percent = 0;
  if (searchGoal > 0 && dailyPointsGoal > 0) {
    const searchRatio = searchDone / searchGoal;
    const pointsRatio = Math.min(1, pointsEarned / dailyPointsGoal);
    percent = Math.round(((searchRatio + pointsRatio) / 2) * 100);
  } else if (searchGoal > 0) {
    percent = Math.round((searchDone / searchGoal) * 100);
  } else if (dailyPointsGoal > 0) {
    percent = Math.round(Math.min(1, pointsEarned / dailyPointsGoal) * 100);
  }

  return {
    missingPoints,
    remainingDesktop,
    remainingMobile,
    percent: Math.min(100, Math.max(0, percent)),
    isComplete: missingPoints === 0 && remainingDesktop === 0 && remainingMobile === 0,
  };
}

export function listLegacyStorageKeys(record = {}) {
  return Object.keys(record).filter((key) => LEGACY_EXTENSION_STORAGE_KEYS.includes(key));
}
