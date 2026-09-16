import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyUserUpdate,
  computeStatus,
  createEmptyDay,
  incrementCounter,
  listLegacyStorageKeys,
  normalizeProgress,
} from "../js/lib/progress.js";

describe("daily progress", () => {
  it("starts an empty day when nothing is stored", () => {
    const now = new Date("2026-09-16T10:00:00.000Z");
    const { progress, didReset, reason } = normalizeProgress(null, now, "UTC");
    assert.equal(didReset, true);
    assert.equal(reason, "missing");
    assert.equal(progress.dateKey, "2026-09-16");
    assert.equal(progress.pointsEarned, 0);
    assert.equal(progress.desktopSearchesDone, 0);
  });

  it("resets counts on a new local day but keeps user goals", () => {
    const stored = {
      dateKey: "2026-09-15",
      timeZone: "Europe/Helsinki",
      pointsEarned: 40,
      desktopSearchesDone: 12,
      mobileSearchesDone: 4,
      dailyPointsGoal: 120,
      desktopSearchGoal: 25,
      mobileSearchGoal: 15,
      notes: "yesterday",
    };
    const now = new Date("2026-09-15T21:30:00.000Z");
    const { progress, didReset, reason } = normalizeProgress(stored, now, "Europe/Helsinki");
    assert.equal(didReset, true);
    assert.equal(reason, "calendar-day-change");
    assert.equal(progress.dateKey, "2026-09-16");
    assert.equal(progress.pointsEarned, 0);
    assert.equal(progress.desktopSearchesDone, 0);
    assert.equal(progress.notes, "");
    assert.equal(progress.dailyPointsGoal, 120);
    assert.equal(progress.desktopSearchGoal, 25);
    assert.equal(progress.mobileSearchGoal, 15);
  });

  it("keeps today's counts when only the timezone name changes on the same date", () => {
    const now = new Date("2026-09-16T12:00:00.000Z");
    const stored = {
      dateKey: "2026-09-16",
      timeZone: "UTC",
      pointsEarned: 18,
      desktopSearchesDone: 6,
      mobileSearchesDone: 1,
      dailyPointsGoal: 90,
      desktopSearchGoal: 30,
      mobileSearchGoal: 20,
      notes: "keep",
      suggestionOffset: 2,
      updatedAt: 1,
    };
    const { progress, didReset, reason } = normalizeProgress(stored, now, "Africa/Abidjan");
    assert.equal(didReset, false);
    assert.equal(reason, "timezone-updated");
    assert.equal(progress.pointsEarned, 18);
    assert.equal(progress.notes, "keep");
    assert.equal(progress.timeZone, "Africa/Abidjan");
  });

  it("resets when a timezone change crosses a calendar date", () => {
    const now = new Date("2026-09-16T21:30:00.000Z");
    const stored = createEmptyDay("2026-09-16", "America/Los_Angeles");
    stored.pointsEarned = 33;
    const { progress, didReset } = normalizeProgress(stored, now, "Europe/Helsinki");
    assert.equal(didReset, true);
    assert.equal(progress.dateKey, "2026-09-17");
    assert.equal(progress.pointsEarned, 0);
  });

  it("sanitizes user updates and computes remaining work", () => {
    const base = createEmptyDay("2026-09-16", "UTC");
    const updated = applyUserUpdate(base, {
      pointsEarned: "36",
      desktopSearchesDone: 10,
      mobileSearchesDone: 2,
      dailyPointsGoal: 90,
      desktopSearchGoal: 30,
      mobileSearchGoal: 20,
      notes: "<script>x</script>ok",
    });
    assert.equal(updated.notes, "xok");
    const status = computeStatus(updated);
    assert.equal(status.missingPoints, 54);
    assert.equal(status.remainingDesktop, 20);
    assert.equal(status.remainingMobile, 18);
    assert.equal(status.isComplete, false);
    assert.ok(status.percent > 0 && status.percent < 100);
  });

  it("increments only user-owned counters", () => {
    const base = createEmptyDay("2026-09-16", "UTC");
    const next = incrementCounter(base, "desktopSearchesDone", 1);
    assert.equal(next.desktopSearchesDone, 1);
    assert.throws(() => incrementCounter(base, "dailyPointsGoal", 1));
  });

  it("lists leftover automator storage keys for wiping", () => {
    assert.deepEqual(
      listLegacyStorageKeys({
        searchState: {},
        dailyProgress: {},
        trendingWordsCache: {},
      }),
      ["searchState", "trendingWordsCache"],
    );
  });
});
