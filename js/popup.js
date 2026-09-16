import config from "./config.js";
import words from "../data/words.js";
import { getCurrentTimeZone } from "./lib/date.js";
import {
  applyUserUpdate,
  computeStatus,
  incrementCounter,
  LEGACY_EXTENSION_STORAGE_KEYS,
  LEGACY_LOCAL_STORAGE_KEYS,
  normalizeProgress,
  STORAGE_KEY,
} from "./lib/progress.js";
import { sanitizeInteger, sanitizePlainText, sanitizeSearchTerm } from "./lib/sanitize.js";
import { suggestTerms } from "./lib/suggestions.js";

const storage = {
  async get(keys) {
    if (globalThis.chrome?.storage?.local?.get) {
      return chrome.storage.local.get(keys);
    }
    return {};
  },
  async set(record) {
    if (globalThis.chrome?.storage?.local?.set) {
      await chrome.storage.local.set(record);
    }
  },
  async remove(keys) {
    if (globalThis.chrome?.storage?.local?.remove) {
      await chrome.storage.local.remove(keys);
    }
  },
};

const elements = {
  appVersion: document.getElementById("appVersion"),
  todayDate: document.getElementById("todayDate"),
  todayZone: document.getElementById("todayZone"),
  resetNotice: document.getElementById("resetNotice"),
  missingSummary: document.getElementById("missingSummary"),
  progressBar: document.getElementById("progressBar"),
  progressLabel: document.getElementById("progressLabel"),
  completeBadge: document.getElementById("completeBadge"),
  pointsEarned: document.getElementById("pointsEarned"),
  dailyPointsGoal: document.getElementById("dailyPointsGoal"),
  desktopSearchesDone: document.getElementById("desktopSearchesDone"),
  desktopSearchGoal: document.getElementById("desktopSearchGoal"),
  mobileSearchesDone: document.getElementById("mobileSearchesDone"),
  mobileSearchGoal: document.getElementById("mobileSearchGoal"),
  notes: document.getElementById("notes"),
  suggestionList: document.getElementById("suggestionList"),
  suggestionStatus: document.getElementById("suggestionStatus"),
  saveStatus: document.getElementById("saveStatus"),
};

let progress = null;
let saveTimer = null;

function setText(node, value) {
  if (node) {
    node.textContent = String(value ?? "");
  }
}

function wipeLegacyBrowserStorage() {
  if (typeof localStorage === "undefined") {
    return;
  }
  for (const key of LEGACY_LOCAL_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }
}

async function wipeLegacyExtensionStorage() {
  const leftover = await storage.get(LEGACY_EXTENSION_STORAGE_KEYS);
  const keys = Object.keys(leftover);
  if (keys.length > 0) {
    await storage.remove(keys);
  }
}

async function persist() {
  if (!progress) {
    return;
  }
  await storage.set({ [STORAGE_KEY]: progress });
  setText(elements.saveStatus, "Saved on this device only.");
}

function schedulePersist() {
  setText(elements.saveStatus, "Saving…");
  globalThis.clearTimeout(saveTimer);
  saveTimer = globalThis.setTimeout(() => {
    persist().catch(() => {
      setText(elements.saveStatus, "Could not save locally.");
    });
  }, 200);
}

function renderStatus() {
  const status = computeStatus(progress);
  const dateLabel = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date());

  setText(elements.todayDate, dateLabel);
  setText(elements.todayZone, progress.timeZone || getCurrentTimeZone());
  setText(elements.progressLabel, `${status.percent}%`);
  if (elements.progressBar) {
    elements.progressBar.style.width = `${status.percent}%`;
    elements.progressBar.setAttribute("aria-valuenow", String(status.percent));
  }

  const missingBits = [];
  missingBits.push(
    status.missingPoints === 0 ? "Point goal met" : `${status.missingPoints} points remaining`,
  );
  missingBits.push(
    status.remainingDesktop === 0
      ? "desktop goal met"
      : `${status.remainingDesktop} desktop searches remaining`,
  );
  missingBits.push(
    status.remainingMobile === 0
      ? "mobile goal met"
      : `${status.remainingMobile} mobile searches remaining`,
  );
  setText(elements.missingSummary, missingBits.join(" · "));
  if (elements.completeBadge) {
    elements.completeBadge.hidden = !status.isComplete;
  }
}

function renderForm() {
  elements.pointsEarned.value = String(progress.pointsEarned);
  elements.dailyPointsGoal.value = String(progress.dailyPointsGoal);
  elements.desktopSearchesDone.value = String(progress.desktopSearchesDone);
  elements.desktopSearchGoal.value = String(progress.desktopSearchGoal);
  elements.mobileSearchesDone.value = String(progress.mobileSearchesDone);
  elements.mobileSearchGoal.value = String(progress.mobileSearchGoal);
  elements.notes.value = progress.notes;
}

function renderSuggestions() {
  const terms = suggestTerms(words, {
    dateKey: progress.dateKey,
    offset: progress.suggestionOffset,
    count: config.suggestions.count,
  });
  elements.suggestionList.replaceChildren();

  for (const term of terms) {
    const safe = sanitizeSearchTerm(term);
    if (!safe) {
      continue;
    }

    const item = document.createElement("li");
    item.className = "suggestion-item";

    const text = document.createElement("span");
    text.className = "suggestion-text";
    text.textContent = safe;

    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "btn-copy";
    copy.textContent = "Copy";
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(safe);
        copy.textContent = "Copied";
        globalThis.setTimeout(() => {
          copy.textContent = "Copy";
        }, 1200);
      } catch {
        copy.textContent = "Copy failed";
      }
    });

    item.append(text, copy);
    elements.suggestionList.append(item);
  }

  setText(
    elements.suggestionStatus,
    "Local suggestions only. Copy a phrase and search yourself if you choose to. This helper never opens Bing or sends queries.",
  );
}

function renderAll() {
  renderForm();
  renderStatus();
  renderSuggestions();
}

function readFormPatch() {
  return {
    pointsEarned: sanitizeInteger(elements.pointsEarned.value),
    dailyPointsGoal: sanitizeInteger(elements.dailyPointsGoal.value),
    desktopSearchesDone: sanitizeInteger(elements.desktopSearchesDone.value),
    desktopSearchGoal: sanitizeInteger(elements.desktopSearchGoal.value),
    mobileSearchesDone: sanitizeInteger(elements.mobileSearchesDone.value),
    mobileSearchGoal: sanitizeInteger(elements.mobileSearchGoal.value),
    notes: sanitizePlainText(elements.notes.value),
  };
}

function applyPatch(patch) {
  progress = applyUserUpdate(progress, patch);
  renderAll();
  schedulePersist();
}

function bindForm() {
  const numericIds = [
    "pointsEarned",
    "dailyPointsGoal",
    "desktopSearchesDone",
    "desktopSearchGoal",
    "mobileSearchesDone",
    "mobileSearchGoal",
  ];
  for (const id of numericIds) {
    elements[id].addEventListener("change", () => applyPatch(readFormPatch()));
  }
  elements.notes.addEventListener("change", () => applyPatch(readFormPatch()));

  document.querySelectorAll("[data-increment]").forEach((button) => {
    button.addEventListener("click", () => {
      const field = button.getAttribute("data-increment");
      progress = incrementCounter(progress, field, 1);
      renderAll();
      schedulePersist();
    });
  });

  document.getElementById("resetToday").addEventListener("click", () => {
    const { progress: next } = normalizeProgress(
      {
        ...progress,
        dateKey: "1970-01-01",
      },
      new Date(),
      progress.timeZone,
    );
    progress = applyUserUpdate(next, {
      dailyPointsGoal: progress.dailyPointsGoal,
      desktopSearchGoal: progress.desktopSearchGoal,
      mobileSearchGoal: progress.mobileSearchGoal,
    });
    setText(elements.resetNotice, "Today’s counters were cleared. Goals were kept.");
    renderAll();
    schedulePersist();
  });

  document.getElementById("refreshSuggestions").addEventListener("click", () => {
    applyPatch({ suggestionOffset: progress.suggestionOffset + 1 });
  });
}

function bindStaticLinks() {
  const links = {
    authorWebsiteLink: config.general.authorWebsiteLink,
    repositoryGithubLink: config.general.repositoryGithubLink,
    storeLink: config.general.storeLink,
    rewardsLink: config.general.rewardsLink,
  };
  for (const [id, href] of Object.entries(links)) {
    const node = document.getElementById(id);
    if (node) {
      node.setAttribute("href", href);
      node.setAttribute("rel", "noopener noreferrer");
      node.setAttribute("target", "_blank");
    }
  }
  setText(elements.appVersion, config.general.appVersion);
}

async function init() {
  bindStaticLinks();
  wipeLegacyBrowserStorage();
  await wipeLegacyExtensionStorage();

  const stored = await storage.get(STORAGE_KEY);
  const resolved = normalizeProgress(stored[STORAGE_KEY], new Date(), getCurrentTimeZone());
  progress = resolved.progress;
  if (resolved.didReset && resolved.reason === "calendar-day-change") {
    setText(elements.resetNotice, "New local day detected. Yesterday’s counters were cleared.");
  }
  renderAll();
  bindForm();
  await persist();
}

init().catch((error) => {
  setText(elements.saveStatus, "Could not load the local dashboard.");
  console.error(error);
});
