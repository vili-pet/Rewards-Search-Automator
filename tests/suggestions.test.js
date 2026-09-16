import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { suggestTerms, uniqueSanitizedTerms } from "../js/lib/suggestions.js";

const words = [
  "karjalanpiirakka resepti",
  "sää huomenna Helsinki",
  "<script>bad</script>",
  "sää huomenna Helsinki",
  "Nuuksio kansallispuisto retkeily",
  "verotus 2025 muutokset Suomi",
];

describe("local suggestions", () => {
  it("drops empty, duplicate, and markup-only terms", () => {
    assert.deepEqual(uniqueSanitizedTerms(words), [
      "karjalanpiirakka resepti",
      "sää huomenna Helsinki",
      "bad",
      "Nuuksio kansallispuisto retkeily",
      "verotus 2025 muutokset Suomi",
    ]);
  });

  it("is deterministic for a given local day and offset", () => {
    const first = suggestTerms(words, { dateKey: "2026-09-16", offset: 0, count: 3 });
    const again = suggestTerms(words, { dateKey: "2026-09-16", offset: 0, count: 3 });
    const nextDay = suggestTerms(words, { dateKey: "2026-09-17", offset: 0, count: 3 });
    assert.deepEqual(first, again);
    assert.equal(first.length, 3);
    assert.notDeepEqual(first, nextDay);
  });

  it("never returns more unique terms than the sanitized pool", () => {
    const terms = suggestTerms(words, { dateKey: "2026-09-16", count: 50 });
    assert.equal(terms.length, uniqueSanitizedTerms(words).length);
    assert.equal(new Set(terms).size, terms.length);
  });
});
