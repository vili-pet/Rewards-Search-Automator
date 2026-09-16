import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  escapeHtml,
  sanitizeInteger,
  sanitizePlainText,
  sanitizeSearchTerm,
} from "../js/lib/sanitize.js";

describe("sanitize", () => {
  it("escapes HTML so suggested text cannot become markup", () => {
    assert.equal(
      escapeHtml(`<img src=x onerror="alert(1)">`),
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;",
    );
    assert.equal(escapeHtml(`a&b`), "a&amp;b");
  });

  it("strips tags, protocols, and control characters from terms", () => {
    assert.equal(sanitizeSearchTerm(`<script>alert(1)</script>safe`), "alert(1)safe");
    assert.equal(sanitizeSearchTerm("javascript:alert(1)"), "alert(1)");
    assert.equal(sanitizeSearchTerm("data:text/html,hi"), "text/html,hi");
    assert.equal(sanitizeSearchTerm("hello\n\tworld"), "hello world");
    assert.equal(sanitizeSearchTerm("a".repeat(200)).length, 120);
  });

  it("clamps counters to safe integers", () => {
    assert.equal(sanitizeInteger("12"), 12);
    assert.equal(sanitizeInteger("12.9"), 12);
    assert.equal(sanitizeInteger(-4), 0);
    assert.equal(sanitizeInteger(50_000), 9999);
    assert.equal(sanitizeInteger("nope", { fallback: 7 }), 7);
    assert.equal(sanitizeInteger(undefined, { fallback: 3 }), 3);
  });

  it("keeps notes as plain text only", () => {
    assert.equal(sanitizePlainText("<b>done</b> today"), "done today");
  });
});
