# Rewards Daily Helper

Compliance-mode Chrome/Edge dashboard for people who already use Microsoft Rewards and want a **local, private checklist** for the day.

This project used to ship as **Rewards Search Automator**. That automator has been removed. The extension **does not run Bing searches**, click, navigate, emulate devices, or send background traffic.

---

## Warning — read this first

- **You** are responsible for following [Microsoft Rewards](https://rewards.microsoft.com/) rules and any applicable terms of service.
- This helper **does not automate searches** and **does not click, type, navigate, or simulate a user**.
- Suggested phrases are optional local ideas only. If you search, you do it yourself in the browser.
- The helper **does not claim or guarantee** that using it — or earning Rewards points — is permitted by Microsoft or by the rewards program.
- The authors are not affiliated with Microsoft. Misuse, including botting or evasion, is unsupported and must not be reintroduced.

If you need the old behavior (queued searches, debugger device spoofing, auto-start, trend scraping), it is gone on purpose. See [SECURITY.md](SECURITY.md).

---

## What it does

- Shows **today’s local date and timezone**
- Lets you enter or increment **points**, **desktop searches**, and **mobile searches** you completed yourself
- Calculates **missing points** and remaining checklist items against goals you set
- Offers **local search-phrase suggestions** you can copy
- Stores progress **only on this device** (`chrome.storage.local`)
- **Resets counters** when the local calendar day changes, including after a timezone change that crosses midnight
- Wipes leftover automator keys if you upgrade from an older build

## What it never does

- Start or schedule searches
- Open Bing, change tabs, or attach a debugger
- Spoof a user agent or emulate a phone
- Fetch trending topics or any other remote list
- Bypass bot detection, CAPTCHAs, or rate limits
- Send telemetry

---

## Install (developer mode)

1. Clone this repository.
2. Open Chrome or Edge at `chrome://extensions/` or `edge://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select this folder.

The popup asks only for the **storage** permission.

---

## Use compliance mode

1. Open the toolbar icon.
2. Set your own daily point and search goals (these are reminders, not quotas the extension can fulfill).
3. After you personally search or check Rewards, update **Points earned**, **Desktop done**, and **Mobile done** — or use the **+1** buttons.
4. Copy a suggested phrase if you want inspiration. Paste it yourself if you decide to search.
5. Optional: write a short local note. Markup is stripped.
6. **Reset today** clears today’s counters and keeps your goals.

Progress is tied to the current timezone’s calendar date. Opening the popup after midnight, or after a timezone change that moves the date, starts a new empty day.

---

## Privacy

- No accounts, analytics, or crash pings
- No background service worker
- No host permissions and no content scripts
- Suggestions come from the bundled `data/words.js` list

---

## Develop

```bash
npm test
npm run lint
npm run build
```

`npm run build` validates the manifest, runs the compliance checks, lints first-party sources, and runs the unit tests. There is no bundler: load the folder unpacked.

---

## License

MIT — see [LICENSE](LICENSE). Original project by [Andrea Corriga](https://andreacorriga.com) / [Strifelab](https://strifelab.com).
