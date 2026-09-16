#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function run(script, label) {
  const result = spawnSync(process.execPath, [script], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    throw new Error(`${label} failed`);
  }
}

function assertExists(relativePath) {
  const abs = path.join(ROOT, relativePath);
  if (!fs.existsSync(abs)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
}

function main() {
  const required = [
    "manifest.json",
    "index.html",
    "js/popup.js",
    "js/config.js",
    "js/lib/date.js",
    "js/lib/sanitize.js",
    "js/lib/progress.js",
    "js/lib/suggestions.js",
    "data/words.js",
    "SECURITY.md",
    "README.md",
  ];
  for (const file of required) {
    assertExists(file);
  }

  if (fs.existsSync(path.join(ROOT, "js", "background.js"))) {
    throw new Error("Build refused: js/background.js must not exist in compliance mode");
  }

  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "manifest.json"), "utf8"));
  if (manifest.version !== "3.0.0") {
    throw new Error("Build refused: manifest version must stay 3.0.0 for this compliance release");
  }
  if (manifest.background) {
    throw new Error("Build refused: background worker is not part of the packaged helper");
  }

  run(path.join("scripts", "validate-compliance.js"), "compliance validation");
  run(path.join("scripts", "lint.js"), "lint");

  const testFiles = fs
    .readdirSync(path.join(ROOT, "tests"))
    .filter((name) => name.endsWith(".test.js"))
    .map((name) => path.join("tests", name));
  const tests = spawnSync(process.execPath, ["--test", ...testFiles], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (tests.status !== 0) {
    throw new Error("tests failed");
  }

  console.log("Build passed: compliance-mode extension is ready to load unpacked.");
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
