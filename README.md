# FireRaven — Spending Tracker

A personal, installable PWA that tracks spending from bank/card screenshots or CSV
exports, categorizes purchases, and gives budget insights via an on-device
Claude-powered assistant.

- **No backend.** Everything runs client-side; your transactions and chat history stay in
  your browser's local storage on your device only.
- **No account, no tracking, no analytics.**
- **AI is optional and yours.** Add your own Anthropic API key in Settings to enable real
  screenshot reading and chat — stored only in your browser, sent only to Anthropic.
  Without a key, the app still works with CSV import, manual entry, budgets, trends, and
  built-in tips.

## What it does
- **Add transactions three ways** — upload one or more bank screenshots (AI reads them),
  paste/import a CSV (no key needed), or type them in by hand (with income support).
- **Real month-by-month view** — every purchase carries a real date, so "this month",
  "vs last month", and the 6-month trend are computed from your actual data. Switch months
  with the ‹ › arrows on Home, Activity, and Insights.
- **Smart categorizing that learns** — confirm a merchant's category once and FireRaven
  remembers it for future imports.
- **Insights** — savings rate and cash flow, 6-month trend, day-by-day and by-weekday
  spending, month-over-month movement per category, per-category budgets, top merchants,
  and an end-of-month projection.
- **Safe to spend** — budget remaining ÷ days remaining, on Home. The number that
  actually changes what you do today.
- **Plan hub** — declare income sources (any cadence, custom income categories), enter
  recurring bills by hand, and get a balance **forecast**: projected balance over 1–60
  months, savings rate, and a runway warning when you're spending more than you earn.
- **Receipt & screenshot scanning** — photograph a paper receipt or upload bank
  screenshots; the AI tells them apart, uses the post-tax grand total for receipts,
  records the tax, and flags (never converts) foreign-currency amounts.
- **Save Money hub** — AI-suggested cheaper alternatives to what you buy repeatedly, a
  real subscription manager (separating true subscriptions from merchants you just visit
  often), and evidence-based spending-leak detection ranked by dollar impact.
- **App lock** — 4-digit PIN, verified against a salted PBKDF2-SHA256 hash. The PIN
  itself is never stored, and never appears in this repository. Wrong guesses are
  throttled with an escalating lockout that survives relaunch.
- **Hardened** — strict Content-Security-Policy (the page can only reach
  api.anthropic.com), no-referrer, and in-app confirmation sheets for every destructive
  action (browser popups are unreliable in installed PWAs).
- **Editable categories** — add, rename, recolor, set per-category budgets; renaming keeps
  existing transactions in sync.
- **Search & filter** activity by text, category, income, or month.
- **Backup & restore** — export all data to JSON (or CSV for spreadsheets) and restore it
  on a new device.
- **Assistant** — ask FireRaven about your spending; works with your key, or falls back to
  built-in data-driven answers.

## Start here
**[GUIDE.md](./GUIDE.md)** — full setup and user guide: publishing to GitHub Pages,
installing on your phone, the app lock, getting data in, and how to actually use each
screen to cut spending.

Short version: host these files on GitHub Pages (it must be `https`), open the link on
your phone, "Install app" / "Add to Home Screen", and unlock with the starting PIN
**1177** — then change it in Settings → App lock.

## Files
`index.html` — the whole app (self-contained, no build step, no dependencies).
`manifest.webmanifest` + `sw.js` — PWA install/offline support.
`raven.png` — the FireRaven mascot. `icon-*.png` — home-screen icons.
`_original-backup/` — the previous compiled version, kept for reference; not needed to run.

## Updating the app later
Re-upload the changed files (usually just `index.html`). The service worker serves the
app shell network-first (cache `fireraven-v4`), so an online launch always gets the
newest build and the cache is only an offline fallback.

## Security notes for a public repo
- **Never commit an API key.** Keys go in Settings → stored in your browser's local
  storage on your device only, and are sent only to Anthropic.
- No transaction data, chat history, or PIN is in this repository — all of it lives in
  local storage on your device. There is no server, database, account, or analytics.
- The starting PIN is present only as a PBKDF2 hash, so publishing the source doesn't
  publish the PIN. It is a device lock, not encryption — change it after installing.

## License
See [LICENSE](./LICENSE).
