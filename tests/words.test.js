import assert from "node:assert/strict";
import { describe, it } from "node:test";
import words from "../data/words.js";
import { suggestTerms, uniqueSanitizedTerms } from "../js/lib/suggestions.js";

describe("bundled suggestion list", () => {
  it("is a local plain-text catalog with no markup payloads", () => {
    assert.ok(Array.isArray(words) && words.length > 50);
    for (const word of words) {
      assert.equal(typeof word, "string");
      assert.doesNotMatch(word, /<script/i);
      assert.doesNotMatch(word, /javascript:/i);
    }
  });

  it("can produce a stable daily shortlist", () => {
    const terms = suggestTerms(words, { dateKey: "2026-09-16", offset: 0, count: 5 });
    assert.equal(terms.length, 5);
    assert.equal(new Set(terms).size, 5);
    assert.ok(terms.every((term) => uniqueSanitizedTerms(words).includes(term)));
  });
});
