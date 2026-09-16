import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getCurrentTimeZone,
  getLocalDateString,
  hasCalendarDayChanged,
  isValidDateKey,
} from "../js/lib/date.js";

describe("date helpers", () => {
  it("accepts only real calendar YYYY-MM-DD keys", () => {
    assert.equal(isValidDateKey("2026-09-16"), true);
    assert.equal(isValidDateKey("2026-02-29"), false);
    assert.equal(isValidDateKey("2024-02-29"), true);
    assert.equal(isValidDateKey("2026-13-01"), false);
    assert.equal(isValidDateKey("16-09-2026"), false);
    assert.equal(isValidDateKey(""), false);
  });

  it("formats the local calendar date in the requested timezone", () => {
    const utcEvening = new Date("2026-09-16T21:30:00.000Z");
    assert.equal(getLocalDateString(utcEvening, "UTC"), "2026-09-16");
    assert.equal(getLocalDateString(utcEvening, "Europe/Helsinki"), "2026-09-17");
    assert.equal(getLocalDateString(utcEvening, "America/Los_Angeles"), "2026-09-16");
    assert.equal(getLocalDateString(utcEvening, "Pacific/Auckland"), "2026-09-17");
  });

  it("treats midnight in the local timezone as a new day", () => {
    const before = new Date("2026-09-15T20:59:00.000Z");
    const after = new Date("2026-09-15T21:01:00.000Z");
    assert.equal(getLocalDateString(before, "Europe/Helsinki"), "2026-09-15");
    assert.equal(getLocalDateString(after, "Europe/Helsinki"), "2026-09-16");
  });

  it("detects a calendar-day change after a timezone move", () => {
    const moment = new Date("2026-09-16T21:30:00.000Z");
    assert.equal(hasCalendarDayChanged("2026-09-16", moment, "America/Los_Angeles"), false);
    assert.equal(hasCalendarDayChanged("2026-09-16", moment, "Europe/Helsinki"), true);
    assert.equal(hasCalendarDayChanged("not-a-date", moment, "UTC"), true);
  });

  it("falls back to UTC when the runtime timezone is missing", () => {
    assert.equal(getCurrentTimeZone({}), "UTC");
    assert.equal(typeof getCurrentTimeZone(), "string");
  });
});
