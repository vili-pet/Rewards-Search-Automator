#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_DIRS = ["js", "data"];
const SOURCE_FILES = ["index.html", "manifest.json"];
const VENDOR_PATTERN = /\.min\.(js|css)$/;

const FORBIDDEN = [
  { pattern: /chrome\.debugger\b/, message: "chrome.debugger API is forbidden" },
  { pattern: /chrome\.tabs\b/, message: "chrome.tabs API is forbidden" },
  { pattern: /chrome\.scripting\b/, message: "chrome.scripting API is forbidden" },
  { pattern: /chrome\.webRequest\b/, message: "chrome.webRequest API is forbidden" },
  { pattern: /chrome\.debugger/, message: "debugger usage is forbidden" },
  { pattern: /setUserAgentOverride/, message: "user-agent override is forbidden" },
  { pattern: /userAgentMetadata/, message: "Client Hints spoofing is forbidden" },
  { pattern: /setDeviceMetricsOverride/, message: "device emulation is forbidden" },
  { pattern: /setTouchEmulationEnabled/, message: "touch emulation is forbidden" },
  { pattern: /performSingleSearch/, message: "automated search loop is forbidden" },
  { pattern: /startSearches/, message: "search start API is forbidden" },
  { pattern: /autoStartAlarm|AUTO_START_ALARM/, message: "auto-start alarm is forbidden" },
  { pattern: /activeMobileAgent|enableDebugger/, message: "debugger/device agents are forbidden" },
  { pattern: /https:\/\/trends\.google\.com/, message: "remote trends fetch is forbidden" },
  { pattern: /all_urls/, message: "broad host permission is forbidden" },
];

function walk(filePath, files = []) {
  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(filePath)) {
      walk(path.join(filePath, entry), files);
    }
    return files;
  }
  if (VENDOR_PATTERN.test(filePath)) {
    return files;
  }
  if (/\.(js|html|json|md)$/.test(filePath) || filePath.endsWith("manifest.json")) {
    files.push(filePath);
  }
  return files;
}

function collectSourceFiles() {
  const files = SOURCE_FILES.map((relative) => path.join(ROOT, relative)).filter((file) =>
    fs.existsSync(file),
  );
  for (const dir of SOURCE_DIRS) {
    const abs = path.join(ROOT, dir);
    if (fs.existsSync(abs)) {
      walk(abs, files);
    }
  }
  return files;
}

function main() {
  const findings = [];
  for (const file of collectSourceFiles()) {
    const relative = path.relative(ROOT, file);
    if (relative === "SECURITY.md" || relative.startsWith("docs" + path.sep)) {
      continue;
    }
    const source = fs.readFileSync(file, "utf8");
    if (
      relative.endsWith(".js") &&
      !relative.startsWith(`scripts${path.sep}`) &&
      /\.innerHTML\s*=/.test(source)
    ) {
      findings.push(`${relative}: assigning innerHTML is forbidden (XSS)`);
    }
    if (relative.endsWith(".js") && /\$\([^)]*\)\.html\s*\(/.test(source)) {
      findings.push(`${relative}: jQuery html() is forbidden (XSS)`);
    }
    for (const rule of FORBIDDEN) {
      if (rule.pattern.test(source)) {
        findings.push(`${relative}: ${rule.message}`);
      }
    }
  }

  if (findings.length > 0) {
    console.error("Lint failed:");
    for (const finding of findings) {
      console.error(`- ${finding}`);
    }
    process.exit(1);
  }

  console.log("Lint passed: no forbidden automation, evasion, or XSS sinks in first-party sources.");
}

main();
