#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function main() {
  const manifest = JSON.parse(read("manifest.json"));
  const popup = read("js/popup.js");
  const index = read("index.html");

  assert(manifest.manifest_version === 3, "Manifest must be MV3");
  assert(JSON.stringify(manifest.permissions || []) === JSON.stringify(["storage"]), "Only the storage permission is allowed");
  assert(!manifest.host_permissions || manifest.host_permissions.length === 0, "host_permissions must be empty");
  assert(!manifest.content_scripts, "content_scripts are not allowed");
  assert(!manifest.background, "background service worker is not allowed");
  assert(!(manifest.permissions || []).includes("debugger"), "debugger permission must stay removed");
  assert(!(manifest.permissions || []).includes("tabs"), "tabs permission must stay removed");
  assert(!(manifest.permissions || []).includes("scripting"), "scripting permission must stay removed");
  assert(!(manifest.permissions || []).includes("webRequest"), "webRequest permission must stay removed");
  assert(!(manifest.permissions || []).includes("alarms"), "alarms permission must stay removed");

  const forbiddenTokens = [
    "chrome.debugger",
    "chrome.tabs",
    "performSingleSearch",
    "startSearches",
    "setUserAgentOverride",
    "fetchGoogleTrendsTopics",
    "autoStartAlarm",
  ];
  for (const token of forbiddenTokens) {
    assert(!popup.includes(token), `popup.js still contains forbidden token: ${token}`);
    assert(!index.includes(token), `index.html still contains forbidden token: ${token}`);
  }

  assert(!fs.existsSync(path.join(ROOT, "js", "background.js")), "legacy background.js must remain deleted");
  assert(popup.includes("textContent"), "popup must render with textContent");
  assert(index.includes("compliance-mode") || index.includes("Compliance"), "dashboard must identify compliance mode");

  console.log("Compliance validation passed.");
}

try {
  main();
} catch (error) {
  console.error(`Validation failed: ${error.message}`);
  process.exit(1);
}
