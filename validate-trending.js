#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const backgroundPath = path.join(root, "js", "background.js");
const manifestPath = path.join(root, "manifest.json");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const background = fs.readFileSync(backgroundPath, "utf8");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  assert(
    background.includes("fetchGoogleTrendsTopics") &&
      background.includes("fetchYleNewsTopics") &&
      background.includes("fetchBingNewsTopics") &&
      background.includes("fetchWikipediaTrendingTopics") &&
      background.includes("fetchBingTrendingTopics"),
    "Trending sources are not fully configured in background.js",
  );

  assert(
    background.includes("TRENDS_STALE_CACHE_MAX_AGE") &&
      background.includes("QUALITY_FALLBACK_TOPICS"),
    "Fallback strategy constants are missing in background.js",
  );

  assert(
    background.includes("RECENT_TERMS_WINDOW") &&
      background.includes("pickLeastRecentTerm"),
    "Rotation logic for preventing repeated terms is missing",
  );

  const hostPermissions = manifest.host_permissions || [];
  assert(
    hostPermissions.includes("https://trends.google.com/*") &&
      hostPermissions.includes("https://api.bing.com/*") &&
      hostPermissions.includes("https://www.bing.com/*") &&
      hostPermissions.includes("https://feeds.yle.fi/*") &&
      hostPermissions.includes("https://fi.wikipedia.org/*"),
    "Manifest host permissions for trend providers are incomplete",
  );

  console.log("Trend topic generation validation passed.");
}

try {
  main();
} catch (error) {
  console.error(`Validation failed: ${error.message}`);
  process.exit(1);
}
