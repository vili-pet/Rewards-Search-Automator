# Security and compliance analysis

This document records the risks that existed in the pre-3.0 **Rewards Search Automator** and the controls applied in the compliance-mode **Rewards Daily Helper**. It is a defensive audit, not an implementation guide for automation or evasion.

## Scope

Reviewed artifacts (original automator):

- `manifest.json` — privileged Chrome/Edge APIs and host access
- `js/background.js` — search loop, alarms, debugger, remote fetches
- `js/popup.js` / `js/config.js` / `index.html` — start/stop UI and scheduling
- `data/words.js` / trending fetchers — query generation
- `README.md` — advertised “natural” timing and device emulation

## Risk register (original extension)

| ID | Area | Severity | Finding |
| --- | --- | --- | --- |
| R1 | Automatic search series | Critical | Background worker started and continued Bing searches without the user performing them (`startSearches`, `performSingleSearch`, `chrome.alarms`, auto-start deadline). This is account-farming / botting behavior against a rewards program. |
| R2 | Unattended / scheduled botting | Critical | `autoStartAlarm` launched a full desktop+mobile session if the day’s searches were not marked done. Searches resumed after browser restart (`onStartup` / `onInstalled`). |
| R3 | Debugger privilege | Critical | `debugger` permission plus `chrome.debugger.attach` / `sendCommand` enabled CDP control of a tab. That is far beyond a popup helper and is a high-risk capability (full page instrumentation). |
| R4 | Bot-detection / fingerprint evasion | High | Mobile/desktop **user-agent spoofing**, Client Hints metadata (`userAgentMetadata`), device metrics override, and touch emulation (`Network.setUserAgentOverride`, `Emulation.setDeviceMetricsOverride`, `Emulation.setTouchEmulationEnabled`) exist only to make automated traffic look like a different device. |
| R5 | Human-mimic delays | High | Randomized min/max delays (up to 60 minutes) and time-of-day windows were documented as a way to “appear more natural” / “mimic human behavior”. That is rate-limit / bot-signal evasion, not a user feature. |
| R6 | Query laundering | Medium | Live Google Trends + Bing news/suggest fetches, stale-cache fallback, and a recent-term rotation window made automated queries look like organic trending searches. Combined with R1 this is traffic shaping for detection avoidance. |
| R7 | Privileged tab control | High | `tabs` permission and `chrome.tabs.update` navigated the active tab to constructed Bing search URLs and, when finished, to promotional sites — without a user click on those URLs. |
| R8 | Background network | Medium | Service worker issued `fetch()` to `trends.google.com`, `api.bing.com`, and `www.bing.com` with no user gesture. That is persistent third-party traffic and a telemetry-adjacent pattern (even if results were only cached locally). |
| R9 | Broad host access | Medium | `host_permissions` for Bing and Google Trends allowed the extension to read those origins from the worker. Unnecessary for a local dashboard. |
| R10 | Promotional hijack | Low | After a run, the active tab was redirected to author/promo URLs (`openAuthorWebsite`). Unexpected navigation of the user’s tab. |
| R11 | XSS / DOM injection | Low–Medium | Popup used jQuery `.html()` / `.attr("href", …)` and a progress bar `innerText` path. Suggested or remote terms were not treated as untrusted. Any future unsanitized term in `innerHTML` would be an XSS bug. |
| R12 | Over-advertised “safe & reliable” | Informational | README claimed privacy and “safe” automation while requesting debugger access and performing unattended searches. Users could not make an informed ToS decision. |

## Permissions that must not return

Do **not** add these unless a future, separately reviewed feature has a lawful, user-visible need and no safer API exists:

- `debugger`
- `webRequest` / `webRequestBlocking` / `declarativeNetRequest` used to hide or rewrite traffic
- `scripting`
- `tabs` (page navigation / screenshot / script injection)
- `<all_urls>` or other broad host patterns
- Host permissions for search engines or trends APIs
- Content scripts on Bing, Rewards, or Google origins

`storage` is the only privileged API retained: it stores the user’s self-reported daily counters on device and is used to delete leftover automator keys.

## Explicitly out of scope (must never be reintroduced)

- Starting, queueing, or repeating searches
- Clicking, scrolling, form-filling, or any user-input simulation
- Navigating tabs or creating tabs to search URLs
- Debugger, CDP, or device/UA emulation
- Fingerprinting, CAPTCHA solving, or rate-limit circumvention
- Randomized “human-like” delays, stealth schedules, or auto-start
- Remote query lists, trend scraping, or background `fetch`
- Telemetry, analytics, or crash pings

## Controls in compliance mode (v3+)

1. **No automation surface** — Popup is a dashboard. There is no start/stop search API, no alarms, and no service-worker search loop.
2. **No background worker** — No `background.service_worker`, so the extension cannot emit traffic while the popup is closed.
3. **Minimal manifest** — `permissions: ["storage"]` only. No `host_permissions`, no `content_scripts`.
4. **Local suggestions only** — Terms come from the bundled `data/words.js` list. Copy-to-clipboard is user-initiated and does not open Bing.
5. **User-owned progress** — Counters change only when the user types or clicks increment/reset in the popup.
6. **Calendar / timezone reset** — Progress is keyed by the local `YYYY-MM-DD` in the current IANA timezone. A date or timezone shift that changes the calendar day starts a new empty day (goals are kept).
7. **Input hygiene** — All numeric fields are clamped integers. Notes and suggested terms are stripped of markup and control characters. The UI uses `textContent` / form values, never `innerHTML` for untrusted data.
8. **Legacy wipe** — Opening the popup removes automator keys (`searchState`, `autoStartSettings`, `trendingWordsCache`, `lastCompletedDate`, and matching `localStorage` keys).
9. **Honest docs** — README states that the user is responsible for Rewards program rules; the helper does not automate searches and does not certify that any use is permitted.

## Residual risk

The helper can still **suggest** search phrases and show missing-point math. That is intentional and user-driven. It does not make those searches, and it cannot know whether a user’s own Bing activity complies with Microsoft Rewards terms. Compliance remains the user’s responsibility.
