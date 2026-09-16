import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

const ROOT = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

describe("compliance mode packaging", () => {
  const manifest = JSON.parse(read("manifest.json"));
  const popup = read("js/popup.js");
  const html = read("index.html");

  it("keeps only the storage permission and no host or script injection surface", () => {
    assert.deepEqual(manifest.permissions, ["storage"]);
    assert.equal(manifest.host_permissions, undefined);
    assert.equal(manifest.content_scripts, undefined);
    assert.equal(manifest.background, undefined);
    for (const denied of ["debugger", "tabs", "scripting", "webRequest", "alarms"]) {
      assert.equal(manifest.permissions.includes(denied), false);
    }
  });

  it("does not ship the automator service worker", () => {
    assert.equal(fs.existsSync(path.join(ROOT, "js", "background.js")), false);
  });

  it("does not expose search automation or evasion APIs in the popup", () => {
    const banned = [
      "chrome.debugger",
      "chrome.tabs",
      "chrome.alarms",
      "performSingleSearch",
      "startSearches",
      "setUserAgentOverride",
      "fetchGoogleTrendsTopics",
      "autoStartAlarm",
    ];
    for (const token of banned) {
      assert.equal(popup.includes(token), false, token);
      assert.equal(html.includes(token), false, token);
    }
  });

  it("renders dashboard copy as text nodes rather than HTML sinks", () => {
    assert.match(popup, /textContent/);
    assert.doesNotMatch(popup, /\.innerHTML\s*=/);
    assert.doesNotMatch(popup, /\$\([^)]*\)\.html\s*\(/);
  });

  it("identifies itself as a non-automating helper", () => {
    assert.match(html, /Compliance mode/);
    assert.match(html, /never searches/);
    assert.match(read("README.md"), /does not automate searches/i);
  });
});
