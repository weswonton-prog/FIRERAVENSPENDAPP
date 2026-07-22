# Putting FireRaven on your phone (permanent + free, no Netlify)

Your app is a self-contained PWA (Progressive Web App). Host these files once on a
**free, permanent** static host, then "Install" it from your phone's browser. It runs
offline afterward and keeps all your data on your device.

Files in this folder (keep them together):
`index.html`, `manifest.webmanifest`, `sw.js`, `raven.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`

(You do **not** need the `_original-backup/` folder — it's just a copy of the previous version, kept for safety. It's harmless to upload but not required.)

---

## Recommended: GitHub Pages (free forever, HTTPS, no card)

1. Make a free account at github.com.
2. Create a new **public** repository, e.g. `fireraven`.
3. Click **Add file → Upload files**, drag in **all the files from this folder**, Commit.
4. Go to the repo's **Settings → Pages**.
5. Under "Build and deployment", Source = **Deploy from a branch**, Branch = **main**, folder = **/ (root)**. Save.
6. Wait ~1 minute. Your app is live at:
   `https://YOUR-USERNAME.github.io/fireraven/`

## Then install it on your phone

1. Open that URL in **Chrome** (Android) or **Safari** (iPhone).
2. Android: tap the **⋮** menu → **Install app** / **Add to Home screen**.
   iPhone: tap **Share** → **Add to Home Screen**.
3. FireRaven lands on your home screen with its icon, opens full-screen, and works offline.

Alternative host if you prefer: **Cloudflare Pages** (pages.cloudflare.com) — also free
and permanent. Connect the same GitHub repo, or drag-drop the folder.

---

## Turn on the real AI (one-time)

FireRaven's screenshot-reading and chat use Claude. To make that work on your phone:

1. Get a key at **console.anthropic.com** → API Keys (starts with `sk-ant-`). Add a
   little credit under Billing.
2. In the app: **Settings → FireRaven AI**, paste the key, **Save key**.

In the app you can also pick which model to use (Settings → Model): **Haiku 4.5** is the
cheapest and fastest, **Sonnet 5** reads messier screenshots more accurately, and
**Opus 4.8** is the most capable. Haiku is a good default for receipts and bank screenshots.

Security notes:
- The key is stored **only on your device** (browser storage) and is sent **only to
  Anthropic** when you chat or scan a screenshot — never anywhere else.
- Because it's on your device, **don't hand your unlocked phone or a copy of the key to
  others**. You can remove it anytime in Settings, or rotate it at console.anthropic.com.
- Without a key the app still works fully: **CSV import**, manual entry, categorized
  totals, budgets, trends, recurring-subscription detection, and built-in data-driven tips.

## Never lose your data
Everything lives in your browser's storage on your device. To be safe, use
**Settings → Export backup (.json)** now and then — it downloads a file you can keep.
**Restore from backup** loads it back (e.g. on a new phone). You can also **Export CSV**
for spreadsheets.

## Updating the app later
If I rebuild the app, re-upload the new `index.html` (and bump nothing else). The service
worker cache is versioned, so phones pick up the new version on next open.
