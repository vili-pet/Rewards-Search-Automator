// Words list for searches
const words = [
  "karjalanpiirakka resepti helppo",
  "sää huomenna Helsinki",
  "jääkiekon MM-kisat 2025 ohjelma",
  "helppo arkiruoka perheelle",
  "paras kahvila Helsinki",
  "Formula 1 2025 kausi tulokset",
  "halvat lennot Eurooppaan Suomesta",
  "netflix parhaat sarjat 2025",
  "koiran koulutus vinkit aloittelijat",
  "asunnon haku Helsinki 2025",
  "verotus 2025 muutokset Suomi",
  "parhaat vaellusreitit Suomessa",
  "Leijonat otteluohjelma 2025",
  "marjastus vinkit aloittelijoille",
  "paras puhelin 2025 hinta-laatu",
  "Lapin matkailu talvella",
  "mansikkakakku resepti helppo",
  "työnhaku vinkit 2025",
  "saunakulttuuri Suomessa historia",
  "Veikkausliiga otteluohjelma",
  "hyvä unirytmi vinkit",
  "ilmalämpöpumppu paras 2025",
  "Ruisrock ohjelma 2025",
  "sijoittaminen aloittelijoille Suomi",
  "Tallinna risteily hinnat 2025",
  "suomalaiset elokuvat 2025",
  "päänsärky luontaishoito kotikonstein",
  "käytetty auto vertailu sivustot",
  "Nightwish keikka 2025",
  "yliopisto hakeminen Suomi 2025",
  "bensahinnat Suomi tänään",
  "Nuuksio kansallispuisto retkeily",
  "Kalevala tarina lyhyesti",
  "lohiresepti arki-iltaan helppo",
  "talvirenkaat laki Suomi",
  "spotify vs apple music vertailu",
  "ohjelmointi kurssi aloittelijoille",
  "Rovaniemi joulu matka",
  "burnout oireet ja hoito",
  "kodin siivous nopeasti vinkit",
  "Suomen historia lyhyesti",
  "indeksirahasto paras 2025",
  "podcast suomi paras 2025",
  "sähköauto suositukset 2025",
  "Flow Festival 2025 ohjelma",
  "phishing tunnistaminen ohjeet",
  "kanakeitto resepti helppo",
  "hiihto MM-kisat 2025",
  "discgolf radat Helsinki ilmaiset",
  "Kela mielenterveyspalvelut",
];

// Trending words cache duration: 1 hour
const TRENDS_CACHE_DURATION = 60 * 60 * 1000;
// Fallback retry delay (minutes) used when the schedule start time is unexpectedly missing
const SCHEDULE_FALLBACK_RETRY_MINUTES = 60;

const ALARM_NAME = "searchAlarm";
const AUTO_START_ALARM = "autoStartAlarm";
let trendingWordsCache = null;

// Configuration
const config = {
  bing: {
    url: "https://bing.com/search?q={q}&form={form}&cvid={cvid}",
    form: "QBRE",
  },
  devices: {
    phone: {
      title: "Samsung Galaxy S21",
      width: 360,
      height: 800,
      deviceScaleFactor: 3,
      userAgent:
        "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
      touch: true,
      mobile: true,
    },
    desktop: {
      title: "Dell Xps 15",
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      touch: false,
      mobile: false,
    },
  },
  general: {
    authorWebsiteLinkThanks: [
      "https://andreacorriga.com/rewards-search-automator/thanks",
      "https://rawe-ceek.strifelab.com/",
    ],
  },
};

// State management - stored in memory, persisted for alarm callbacks
let searchState = {
  isRunning: false,
  currentSearch: 0,
  totalSearches: 0,
  tabId: null,
  searchType: null, // 'desktop', 'mobile', 'desktopMobile'
  phase: null, // 'desktop', 'mobile'
  millisecondsMin: 120000,
  millisecondsMax: 3600000,
  desktopSearches: 3,
  mobileSearches: 3,
  scheduleStartTime: "",
  scheduleEndTime: "",
};

// Save state to chrome.storage.local for persistence
async function saveState() {
  await chrome.storage.local.set({ searchState: searchState });
}

// Load state from chrome.storage.local
async function loadState() {
  const result = await chrome.storage.local.get("searchState");
  if (result.searchState) {
    searchState = result.searchState;
  }
}

// Helper functions
// Fetch daily trending searches from Google Trends (Finland) and cache for 1 hour.
// Falls back to the local words list when the fetch fails.
async function fetchTrendingWords() {
  // Return in-memory cache if still valid
  if (trendingWordsCache) {
    return trendingWordsCache;
  }

  // Check storage cache
  const cached = await chrome.storage.local.get("trendingWordsCache");
  const entry = cached.trendingWordsCache;
  if (
    entry &&
    Array.isArray(entry.terms) &&
    typeof entry.timestamp === "number" &&
    entry.terms.length > 0 &&
    Date.now() - entry.timestamp < TRENDS_CACHE_DURATION
  ) {
    trendingWordsCache = entry.terms;
    return entry.terms;
  }

  try {
    const response = await fetch(
      "https://trends.google.com/trends/trendingsearches/daily/rss?geo=FI",
      { signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const xml = await response.text();

    // Extract <title> content from RSS items (skip first which is the channel title)
    const matches = [
      ...xml.matchAll(
        /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/g,
      ),
    ];
    const terms = matches
      .slice(1)
      .map((m) => m[1]?.trim())
      .filter((t) => t && t.length > 0);

    if (terms.length > 0) {
      trendingWordsCache = terms;
      await chrome.storage.local.set({
        trendingWordsCache: { terms, timestamp: Date.now() },
      });
      console.info(`Loaded ${terms.length} trending search terms from Google Trends.`);
      return terms;
    }
  } catch (error) {
    console.log(
      "Could not fetch trending words, using local list:",
      error.message,
    );
  }

  // Fallback: use the local Finnish word list
  trendingWordsCache = words;
  return words;
}

function getRandomSearchWord() {
  const pool =
    Array.isArray(trendingWordsCache) && trendingWordsCache.length > 0
      ? trendingWordsCache
      : words;
  return pool[Math.floor(Math.random() * pool.length)];
}

function randomDelay() {
  return Math.floor(
    Math.random() *
      (parseInt(searchState.millisecondsMax) -
        parseInt(searchState.millisecondsMin) +
        1) +
      parseInt(searchState.millisecondsMin),
  );
}

// Return true if current local time is within the [startHHMM, endHHMM) window.
// If either value is empty/missing, the window is treated as unrestricted and
// the function always returns true (no schedule restriction).
// When start equals end (e.g. "12:00"/"12:00") the window is also treated as
// unrestricted (always returns true).
function isWithinSchedule(startHHMM, endHHMM) {
  if (!startHHMM || !endHHMM) return true;
  const now = new Date();
  const [startH, startM] = startHHMM.split(":").map(Number);
  const [endH, endM] = endHHMM.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  const start = startH * 60 + startM;
  const end = endH * 60 + endM;
  if (start === end) {
    return true; // Same start and end — treat as no restriction
  }
  if (start < end) {
    return cur >= start && cur < end;
  }
  // Overnight window (e.g. 22:00–06:00)
  return cur >= start || cur < end;
}

// Minutes until the schedule window opens next.
// This function is only called after isWithinSchedule() returned false,
// which guarantees startHHMM is non-empty; the guard is purely defensive.
function minutesUntilScheduleStart(startHHMM) {
  if (!startHHMM) return SCHEDULE_FALLBACK_RETRY_MINUTES; // Defensive: retry after 1 hour
  const now = new Date();
  const [startH, startM] = startHHMM.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  const start = startH * 60 + startM;
  let diff = start - cur;
  if (diff <= 0) diff += 24 * 60;
  return diff;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Returns today's local date as "YYYY-MM-DD"
function todayDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Returns true if searches have already been completed today
async function hasCompletedToday() {
  const result = await chrome.storage.local.get("lastCompletedDate");
  return result.lastCompletedDate === todayDateString();
}

// (Re-)schedule the daily auto-start alarm from stored autoStartSettings.
// Clears the alarm when auto-start is disabled or no time is configured.
async function scheduleAutoStartAlarm() {
  const stored = await chrome.storage.local.get("autoStartSettings");
  const s = stored.autoStartSettings;

  if (!s || !s.enabled || !s.time) {
    chrome.alarms.clear(AUTO_START_ALARM);
    return;
  }

  const timeRegex = /^\d{2}:\d{2}$/;
  if (!timeRegex.test(s.time)) {
    console.warn("Auto-start: invalid time format, expected HH:MM:", s.time);
    chrome.alarms.clear(AUTO_START_ALARM);
    return;
  }

  const [h, m] = s.time.split(":").map(Number);
  if (h > 23 || m > 59) {
    console.warn("Auto-start: time value out of range:", s.time);
    chrome.alarms.clear(AUTO_START_ALARM);
    return;
  }
  const now = new Date();
  const target = new Date(now);
  target.setHours(h, m, 0, 0);

  // If the target time has already passed today, aim for tomorrow
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  // periodInMinutes keeps the alarm recurring daily without manual rescheduling
  chrome.alarms.create(AUTO_START_ALARM, {
    when: target.getTime(),
    periodInMinutes: 24 * 60,
  });
  console.log(`Auto-start alarm set for ${target.toLocaleTimeString()}.`);
}

async function getTabId() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      var activeTabId = activeTab.id;
      resolve(activeTabId);
    });
  });
}

// Notify popup about state changes
function notifyPopup(message) {
  chrome.runtime.sendMessage(message).catch(() => {
    // Popup might be closed, ignore error
  });
}

// Enable debugger
async function enableDebugger(tabId) {
  return new Promise((resolve, reject) => {
    chrome.debugger.attach({ tabId }, "1.2", function () {
      console.log(`Debugger enabled for tab: ${tabId}`);
      resolve(true);
    });
  });
}

// Disable debugger
async function disableDebugger(tabId) {
  return new Promise((resolve, reject) => {
    chrome.debugger.detach({ tabId }, function () {
      console.log(`Debugger disabled for tab: ${tabId}`);
      resolve(true);
    });
  });
}

// Activate mobile user agent
async function activeMobileAgent(tabId) {
  return new Promise((resolve, reject) => {
    // First set the user agent override with full mobile hints
    chrome.debugger.sendCommand(
      {
        tabId: tabId,
      },
      "Network.setUserAgentOverride",
      {
        userAgent: config.devices.phone.userAgent,
        acceptLanguage: "en-US,en;q=0.9",
        platform: "Linux armv8l",
        userAgentMetadata: {
          brands: [
            { brand: "Google Chrome", version: "131" },
            { brand: "Chromium", version: "131" },
            { brand: "Not_A Brand", version: "24" },
          ],
          fullVersionList: [
            { brand: "Google Chrome", version: "131.0.0.0" },
            { brand: "Chromium", version: "131.0.0.0" },
            { brand: "Not_A Brand", version: "24.0.0.0" },
          ],
          platform: "Android",
          platformVersion: "13.0.0",
          architecture: "",
          model: "SM-S908B",
          mobile: true,
          bitness: "",
          wow64: false,
        },
      },
      function () {
        // Then set device metrics
        chrome.debugger.sendCommand(
          {
            tabId: tabId,
          },
          "Emulation.setDeviceMetricsOverride",
          {
            width: config.devices.phone.width,
            height: config.devices.phone.height,
            deviceScaleFactor: config.devices.phone.deviceScaleFactor,
            mobile: config.devices.phone.mobile,
            screenWidth: config.devices.phone.width,
            screenHeight: config.devices.phone.height,
            positionX: 0,
            positionY: 0,
            screenOrientation: { type: "portraitPrimary", angle: 0 },
          },
          function () {
            // Enable touch emulation
            chrome.debugger.sendCommand(
              {
                tabId: tabId,
              },
              "Emulation.setTouchEmulationEnabled",
              {
                enabled: true,
                maxTouchPoints: 5,
              },
              function () {
                resolve(true);
              },
            );
          },
        );
      },
    );
  });
}

// Activate desktop user agent
async function activeDesktopAgent(tabId) {
  return new Promise((resolve, reject) => {
    chrome.debugger.sendCommand(
      {
        tabId: tabId,
      },
      "Network.setUserAgentOverride",
      {
        userAgent: config.devices.desktop.userAgent,
        acceptLanguage: "en-US,en;q=0.9",
        platform: "Win32",
        userAgentMetadata: {
          brands: [
            { brand: "Google Chrome", version: "131" },
            { brand: "Chromium", version: "131" },
            { brand: "Not_A Brand", version: "24" },
          ],
          fullVersionList: [
            { brand: "Google Chrome", version: "131.0.0.0" },
            { brand: "Chromium", version: "131.0.0.0" },
            { brand: "Not_A Brand", version: "24.0.0.0" },
          ],
          platform: "Windows",
          platformVersion: "15.0.0",
          architecture: "x86",
          model: "",
          mobile: false,
          bitness: "64",
          wow64: false,
        },
      },
      function () {
        chrome.debugger.sendCommand(
          {
            tabId: tabId,
          },
          "Emulation.setDeviceMetricsOverride",
          {
            width: config.devices.desktop.width,
            height: config.devices.desktop.height,
            deviceScaleFactor: config.devices.desktop.deviceScaleFactor,
            mobile: config.devices.desktop.mobile,
            screenWidth: config.devices.desktop.width,
            screenHeight: config.devices.desktop.height,
          },
          function () {
            // Disable touch emulation
            chrome.debugger.sendCommand(
              {
                tabId: tabId,
              },
              "Emulation.setTouchEmulationEnabled",
              {
                enabled: false,
              },
              function () {
                resolve(true);
              },
            );
          },
        );
      },
    );
  });
}

// Open author website
function openAuthorWebsite() {
  const choice =
    Math.random() < 0.7
      ? config.general.authorWebsiteLinkThanks[0]
      : config.general.authorWebsiteLinkThanks[1];
  chrome.tabs.update(searchState.tabId, { url: choice });
}

// Perform a single search
async function performSingleSearch() {
  if (!searchState.isRunning) return;

  // If outside the allowed time window, defer until the window opens
  const { scheduleStartTime, scheduleEndTime } = searchState;
  if (!isWithinSchedule(scheduleStartTime, scheduleEndTime)) {
    const waitMinutes = minutesUntilScheduleStart(scheduleStartTime);
    console.log(
      `Outside schedule window. Next search in ${waitMinutes} minute(s) at ${scheduleStartTime}.`,
    );
    await saveState();
    chrome.alarms.create(ALARM_NAME, { delayInMinutes: waitMinutes });
    return;
  }

  const searchUrl = config.bing.url
    .replace("{q}", encodeURIComponent(getRandomSearchWord()))
    .replace("{form}", config.bing.form)
    .replace("{cvid}", "");

  console.log("Open new search at:", searchUrl);

  try {
    await chrome.tabs.update(searchState.tabId, { url: searchUrl });
  } catch (error) {
    console.error("Error updating tab:", error);
    stopSearches();
    return;
  }

  searchState.currentSearch++;
  const progress = parseInt(
    (searchState.currentSearch / searchState.totalSearches) * 100,
  );

  notifyPopup({
    type: "progress",
    progress: progress,
    currentSearch: searchState.currentSearch,
    totalSearches: searchState.totalSearches,
    phase: searchState.phase,
  });

  if (searchState.currentSearch < searchState.totalSearches) {
    // Schedule next search using chrome.alarms
    await saveState();
    const delayInMinutes = randomDelay() / 60000; // Convert ms to minutes
    chrome.alarms.create(ALARM_NAME, {
      delayInMinutes: Math.max(delayInMinutes, 0.1),
    }); // Min 6 seconds
  } else {
    // Phase completed
    await handlePhaseComplete();
  }
}

// Handle phase completion
async function handlePhaseComplete() {
  if (searchState.searchType === "desktop") {
    // Desktop only completed
    await completeSearches();
  } else if (searchState.searchType === "mobile") {
    // Mobile only completed
    await activeDesktopAgent(searchState.tabId);
    await disableDebugger(searchState.tabId);
    await completeSearches();
  } else if (searchState.searchType === "desktopMobile") {
    if (searchState.phase === "desktop") {
      // Switch to mobile phase
      searchState.phase = "mobile";
      searchState.currentSearch = 0;
      searchState.totalSearches = searchState.mobileSearches;

      await enableDebugger(searchState.tabId);
      await activeMobileAgent(searchState.tabId);

      notifyPopup({
        type: "phaseChange",
        phase: "mobile",
        totalSearches: searchState.totalSearches,
      });

      // Start mobile searches using chrome.alarms
      await saveState();
      const delayInMinutes = randomDelay() / 60000;
      chrome.alarms.create(ALARM_NAME, {
        delayInMinutes: Math.max(delayInMinutes, 0.1),
      });
    } else {
      // Mobile phase completed
      await activeDesktopAgent(searchState.tabId);
      await disableDebugger(searchState.tabId);
      await completeSearches();
    }
  }
}

// Complete all searches
async function completeSearches() {
  searchState.isRunning = false;
  openAuthorWebsite();

  // Record that searches were completed today so auto-start won't trigger again
  await chrome.storage.local.set({ lastCompletedDate: todayDateString() });

  notifyPopup({
    type: "complete",
  });

  // Reset state
  searchState = {
    ...searchState,
    isRunning: false,
    currentSearch: 0,
    totalSearches: 0,
    tabId: null,
    searchType: null,
    phase: null,
  };

  // Clear alarm and saved state
  chrome.alarms.clear(ALARM_NAME);
  await chrome.storage.local.remove("searchState");
}

// Stop searches
async function stopSearches() {
  searchState.isRunning = false;

  notifyPopup({
    type: "stopped",
  });

  // Try to disable debugger if active
  if (
    searchState.tabId &&
    (searchState.searchType === "mobile" ||
      (searchState.searchType === "desktopMobile" &&
        searchState.phase === "mobile"))
  ) {
    disableDebugger(searchState.tabId).catch(() => {});
  }

  searchState = {
    ...searchState,
    isRunning: false,
    currentSearch: 0,
    totalSearches: 0,
    tabId: null,
    searchType: null,
    phase: null,
  };

  // Clear alarm and saved state
  chrome.alarms.clear(ALARM_NAME);
  await chrome.storage.local.remove("searchState");
}

// Start searches
async function startSearches(type, settings) {
  if (searchState.isRunning) {
    return { success: false, error: "Searches already running" };
  }

  const tabId = await getTabId();

  searchState = {
    isRunning: true,
    currentSearch: 0,
    totalSearches:
      type === "mobile" ? settings.mobileSearches : settings.desktopSearches,
    tabId: tabId,
    searchType: type,
    phase: type === "mobile" ? "mobile" : "desktop",
    millisecondsMin: settings.millisecondsMin,
    millisecondsMax: settings.millisecondsMax,
    desktopSearches: settings.desktopSearches,
    mobileSearches: settings.mobileSearches,
    scheduleStartTime: settings.scheduleStartTime || "",
    scheduleEndTime: settings.scheduleEndTime || "",
  };

  // Initialize mobile mode if needed
  if (type === "mobile") {
    await enableDebugger(tabId);
    await activeMobileAgent(tabId);
  }

  // Fetch/refresh trending words before starting
  await fetchTrendingWords();

  // Save state and start the first search
  await saveState();
  performSingleSearch();

  return { success: true };
}

// Alarm listener - this fires even when popup is closed
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM_NAME) {
    await loadState();
    if (searchState.isRunning) {
      performSingleSearch();
    }
  }

  if (alarm.name === AUTO_START_ALARM) {
    // Skip if searches are already running
    if (searchState.isRunning) return;

    // Skip if searches were already completed today
    const done = await hasCompletedToday();
    if (done) return;

    const stored = await chrome.storage.local.get("autoStartSettings");
    const s = stored.autoStartSettings;
    if (!s || !s.enabled) return;

    console.log("Auto-start: starting searches automatically.");
    startSearches(s.searchType || "desktopMobile", {
      desktopSearches: s.desktopSearches ?? 3,
      mobileSearches: s.mobileSearches ?? 3,
      millisecondsMin: s.millisecondsMin ?? 120000,
      millisecondsMax: s.millisecondsMax ?? 3600000,
      scheduleStartTime: s.scheduleStartTime ?? "",
      scheduleEndTime: s.scheduleEndTime ?? "",
    }).catch((err) => {
      console.error("Auto-start: failed to start searches:", err);
    });
  }
});

// Restore state on service worker startup
chrome.runtime.onStartup.addListener(async () => {
  fetchTrendingWords().catch(() => {}); // Pre-warm cache
  await scheduleAutoStartAlarm();
  await loadState();
  if (searchState.isRunning) {
    // Resume searches
    performSingleSearch();
  }
});

// Also check on install/update
chrome.runtime.onInstalled.addListener(async () => {
  await scheduleAutoStartAlarm();
  await loadState();
  if (searchState.isRunning) {
    performSingleSearch();
  }
});

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "startSearches") {
    startSearches(message.searchType, message.settings).then((result) => {
      sendResponse(result);
    });
    return true; // Indicates async response
  }

  if (message.type === "stopSearches") {
    stopSearches().then(() => {
      sendResponse({ success: true });
    });
    return true; // Indicates async response
  }

  if (message.type === "updateAutoStartSettings") {
    chrome.storage.local.set({ autoStartSettings: message.settings }).then(() => {
      scheduleAutoStartAlarm();
      sendResponse({ success: true });
    });
    return true; // Indicates async response
  }

  if (message.type === "getState") {
    // Load state from storage first to get persisted state
    loadState().then(() => {
      sendResponse({
        isRunning: searchState.isRunning,
        currentSearch: searchState.currentSearch,
        totalSearches: searchState.totalSearches,
        phase: searchState.phase,
        searchType: searchState.searchType,
      });
    });
    return true; // Indicates async response
  }
});

// Close debugger in case is open when popup closes (fallback)
chrome.runtime.onConnect.addListener(async function (port) {
  if (port.name === "popup") {
    port.onDisconnect.addListener(async function () {
      // Only detach debugger if searches are NOT running
      // This allows searches to continue when popup closes
      if (!searchState.isRunning) {
        let tabId = await getTabId();
        chrome.debugger.detach({ tabId }, function () {
          console.log(`Debugger disabled for tab: ${tabId}`);
        });
      }
    });
  }
});
