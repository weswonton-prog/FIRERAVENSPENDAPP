# FireRaven — Setup & User Guide

Everything you need to get FireRaven running and actually use it to control your
spending. Read Part 1 once, then keep Part 3 handy.

---

## ⚡ The 30-second version

1. Open your GitHub Pages link on your phone.
2. **Your PIN is `1177`.** Type it on the keypad.
3. Add → **Screenshot** (needs an API key) or **CSV** / **Manual** (no key needed).
4. Check the **Save** tab. That's where the money is.
5. Change your PIN in **Settings → App lock → Change PIN**. (Please do — see §4.)

---

# Part 1 — Setup

## 1.1 Publish it

The whole app is the `pwa/` folder. There is no build step, no server, no
dependencies — it's one HTML file plus a few images.

1. Push the repo to GitHub.
2. Repo **Settings → Pages → Source: Deploy from a branch**, branch `main`,
   folder `/pwa` (or `/root` if you move the files up).
3. Wait ~1 minute. Your link appears at the top of that Pages settings screen —
   something like `https://<your-username>.github.io/<repo>/`.

**It must be `https://`.** The PIN lock uses WebCrypto, which browsers only
allow on secure origins. On `https` (which GitHub Pages always is) you're fine.
If you ever open the app over plain `http://` or from a `file://` path, the lock
disables itself and shows a warning rather than trapping you out.

## 1.2 Install it to your home screen

This is what makes it feel like a real app instead of a web page — full screen,
own icon, works offline.

- **iPhone (Safari):** open the link → Share ⬆ → *Add to Home Screen* → Add.
  It must be Safari; Chrome on iOS can't install PWAs.
- **Android (Chrome):** open the link → ⋮ menu → *Install app* / *Add to Home screen*.

Launch it from the home-screen icon from then on.

## 1.3 Turn on the AI (optional but worth it)

Without a key FireRaven still does everything except read screenshots and hold a
live conversation — CSV import, manual entry, all analytics, all savings
detection, and built-in suggestions work offline.

With a key you additionally get: **screenshot reading** (photograph your banking
app, it extracts every row) and **personalised cheaper-alternative suggestions**.

1. Get a key at [console.anthropic.com](https://console.anthropic.com) → API Keys.
   Put a small amount of credit on it; Haiku costs fractions of a cent per scan.
2. FireRaven → **Settings → Anthropic API key** → paste → *Save key*.
3. Pick a model. **Haiku 4.5** is the right default — fast and cheap. Switch to
   **Sonnet 5** only if a screenshot is being read inaccurately.

**The key is stored only in your browser's local storage on that device.** It is
never committed to the repo, never sent anywhere except directly to Anthropic.
Anyone who visits your public GitHub Pages link gets an empty app and uses their
own key — they cannot see your data or your key.

---

# Part 2 — Getting your data in

Three ways. Mix them freely; FireRaven de-duplicates on date + merchant + amount,
so re-importing an overlapping statement won't create doubles.

### Screenshot or receipt photo (fastest, needs a key)
**＋ → Screenshot.** Two buttons:

- **Take a photo of a receipt** — opens the camera directly. Use this for paper
  receipts.
- **Choose image(s) from library** — for banking-app screenshots. Select several
  at once.

FireRaven works out which kind of image it's looking at:

- A **statement or app screenshot** → one transaction per row.
- A **single receipt** → exactly one transaction, using the *grand total after
  tax, tip and discounts* — not the subtotal, and not one entry per line item.
  If it can read a GST/HST/PST/QST line it records the tax in the note.

It also reads the **currency printed on the image**. Canadian receipts (anything
showing GST/HST/PST/QST, or a plain `$`) are treated as CAD. If it finds a
*different* currency it records the amount as-is, adds a note like
`⚠ amount is in USD, not CAD`, and flags it for review — **it never silently
converts**, because a wrong exchange rate would quietly corrupt every total.

Categories are assigned by what the merchant *sells*: a supermarket is Groceries
even if the receipt has household items on it; a café or food delivery is Dining;
fuel, transit and parking are Transport.

For best results: get the whole receipt in frame including the total line, avoid
heavy glare, and keep it reasonably flat.

### CSV (best for bulk history, no key needed)
**＋ → CSV.** Export from your bank (nearly every bank offers this) and either
paste the rows or pick the `.csv` file. It auto-detects Date / Description /
Amount columns, and handles separate Debit/Credit columns too. Negative amounts
become expenses, positive become income.

*Start here.* Importing 6–12 months of CSV history in one go is the single best
thing you can do — every trend, subscription and savings suggestion gets sharper
the more history it has.

### Manual
**＋ → Manual.** Merchant, amount, date, category, optional note. Toggle
Expense/Income at the top.

### The review inbox
When FireRaven can't confidently categorize something it flags it. The 🔔 bell on
Home shows the count. Open it, tap a category, Confirm — **and it remembers that
merchant forever**. Ten minutes of this early on and it rarely asks again.

---

# Part 3 — Using it

## 3.1 Home — "am I okay right now?"

- **Big number** — spent this month, with the % change vs last month.
- **Budget bar** — set your target in Settings → Monthly budget.
- **Safe to spend** — *the most useful number in the app.* Budget remaining
  divided by days remaining. If it says `$42 a day`, staying under $42 today
  keeps you on budget. Check this before you spend, not after.
- **Savings banner** — jumps straight to the Save tab when there's money to find.
- Use the ‹ › arrows to look at any past month. Every screen respects it.

## 3.2 Activity — the ledger

Search by merchant, note or category; filter by category chips; grouped by day.
Tap any row to edit or delete it. Editing a category re-teaches the merchant.

## 3.3 Insights — "what is actually happening?"

- **Four stat tiles** — spent, income, net, average purchase, plus your
  **savings rate** (what % of income you kept) and no-spend day count.
- **Cash flow** — in vs out side by side. If Out is longer than In, you're
  running a deficit that month.
- **6-month trend** and **on-track projection** — where this month lands if you
  carry on at the current daily pace.
- **Day by day** — a bar per calendar day. Spikes are usually one big purchase.
- **Which days cost you** — spend by weekday. Most people are shocked by their
  weekend number; it's the easiest habit to target because it's concentrated.
- **Versus last month** — every category with ▲/▼ and the dollar change. This is
  where you catch lifestyle creep before it becomes normal.

## 3.4 Plan — forecast, income, commitments, savings

Four tabs. The header shows what you're **keeping (or short) each month**.

### Forecast — where you're heading
A projected balance line for the next 12 months (adjustable, 1–60), with
milestones at 3, 6 and 12 months, and your savings rate.

**Set your starting balance** (Forecast → Starting balance) — what's actually in
your account today. Everything projects forward from that number.

The "How this is built" card shows the whole calculation, so you can see exactly
where a number came from:

| Line | Where it comes from |
|---|---|
| Income | Your Income tab, or averaged from deposits if you haven't added any |
| Commitments | Recurring bills you entered + auto-detected subscriptions |
| Everyday spending | Average of your last 3 months, minus commitments already in that history |
| Left over / Shortfall | Income − everything above |

That third row is subtler than it looks. Your transaction history *already
contains* your Netflix charge, so counting it again as a "commitment" would
double it. But a rent payment you make from another account never appears in an
imported statement, so it's genuinely additional. FireRaven checks which
commitments actually show up in your history and only subtracts those.

**If you're running a deficit** it shows a **runway** instead: how many months
your current balance lasts, and exactly how much you'd need to cut to break even.

It's a straight-line projection. It assumes your income and habits hold — it
can't know about a raise or a big one-off. Treat it as a trajectory, not a promise.

### Income — what comes in
Add every source: paycheque, freelance, side income, investments, benefits.
Each has an **amount** and a **cadence** — weekly, every 2 weeks, twice a month,
monthly, quarterly, every 6 months, or yearly. FireRaven converts everything to a
monthly figure (a $2,400 biweekly cheque is $5,200/mo, because 26 payments ÷ 12
months — not $4,800; this trips people up).

Group sources with **income categories**, which you can create and edit yourself
(Income → Manage income categories) — Salary, Freelance, Rental, Dividends,
whatever fits.

**Pause** a source instead of deleting it when it stops temporarily; it stays in
the list but drops out of the forecast.

If what you've declared drifts more than 15% from your actual deposits,
FireRaven flags the mismatch — worth checking which one is wrong, because the
forecast trusts what you declare.

### Recurring — what you're committed to
Two lists:

- **Your recurring bills** — entered by hand, any cadence. Rent, insurance,
  phone, gym. These are authoritative and drive the forecast, so nothing depends
  on FireRaven spotting them in a statement. Add anything that bills on a
  schedule.
- **Auto-detected subscriptions** — found in your transactions. Tap **Cancel** to
  mark your intent (you still have to cancel with the provider).

Anything you enter by hand that *also* appears in your transactions is counted
**once**, not twice.

Below those, **Regular merchants** — places you buy from most months. Not
subscriptions, nothing to cancel, but it's where your steady money goes.

### Save — cheaper swaps and leaks
Everything from the old Save tab: AI-found cheaper alternatives to what you buy
repeatedly, plus evidence-based leak detection. Described below.

That headline is deliberately capped at 40% of your typical monthly spend —
individual suggestions overlap in real life, and a number you might actually hit
is more useful than an optimistic sum of best cases.

### Ideas — cheaper versions of what you already buy
Tap **Find cheaper alternatives**. FireRaven looks at what you buy *repeatedly*
and proposes like-for-like swaps — same need met, lower price. Not "spend less":
specific substitutions, with the trade-off stated honestly.

> *The Keg ($107/mo) → cook the same dish at home twice a month — a restaurant
> main is typically 3–4× its grocery cost; keep the outing, halve the frequency.*
> **$38/mo**

With an API key these are tailored to your exact merchants. Without one you get
the built-in rule set, which still covers coffee, delivery, groceries, streaming,
fuel, phone plans, gyms and impulse buying. Tap **I'll try this** to mark one —
marked items stop counting toward the headline so it reflects what's left to find.

### Subscriptions — what you're committed to
Every recurring charge, with monthly cost, annual cost, and the estimated next
billing date.

FireRaven distinguishes two things most trackers confuse:
- **Subscriptions** — a recognised service (Netflix, Spotify, Adobe…) or a steady
  monthly bill (Rogers, hydro, insurance, gym). These you can cancel.
- **Regular merchants** — Costco, Loblaws, your local pub. You visit most months,
  but there's nothing to cancel. Listed separately, for information only.

Tap **Cancel** to mark your intent. It stops counting toward your monthly total
and moves to a "marked cancelled" list. **This only tracks your decision — you
still have to actually cancel with the provider.**

### Habits — where your money leaks
Evidence-based findings from your real transactions, ranked by dollar impact:

- **Frequent small buys** — the ones that don't feel like spending. "34 visits
  averaging $6.40 = $218/mo."
- **Dining vs groceries balance** — flags when eating out is outpacing cooking.
- **Streaming stack** — several services at once; rotate one at a time.
- **Categories running hot** — compared against your own 3-month average and
  pro-rated, so a half-finished month isn't unfairly compared to a full one.
- **Weekend overspend** — when Sat/Sun run well above your weekday rate.
- **Fees and interest** — pure waste; always worth eliminating.
- **Over-budget categories** — against per-category budgets you set.

Tap **Mark handled** to clear one.

### Savings goal
Set one in the Save header or Settings. The hub then shows progress toward it.

## 3.5 FireRaven — the assistant

The raven button in the Home and Save headers. It sees your real numbers:
this month's spending, categories, subscriptions, safe-to-spend, and the savings
opportunities it has found. Ask things like:

- *Where can I save?* · *Safe to spend today?* · *My subscriptions*
- *Why is dining up?* · *What was my biggest purchase last month?*

Without an API key it still answers from built-in logic with your actual figures.

## 3.6 Categories & budgets

**Settings → Categories & budgets.** Add, rename, recolor, set a per-category
monthly budget. Renaming migrates existing transactions automatically. Deleting
moves its transactions to Other.

Per-category budgets are worth setting for your two or three problem areas —
they light up on Insights and feed the "over budget" leak detection.

---

# Part 4 — Security & privacy

## What's protected, honestly

**The PIN is a device lock, not encryption.** It stops someone who picks up your
unlocked phone from browsing your finances. It does not encrypt the data on disk
— someone with real technical access to the device could still read it. Treat a
lost phone as a lost phone.

**Your PIN is never stored anywhere.** Only a salted PBKDF2-SHA256 verifier
(210,000 iterations) is kept, on your device. The app only ever needs to *check*
a PIN, never recover it — so the digits `1177` appear nowhere in the source code
either, just a hash of them. That's why the starting PIN is safe to have in a
public repo.

**Still — change it.** The default's hash is in a public repo, and a 4-digit
space is small enough to grind offline given the file. Settings → App lock →
Change PIN. Once you do, your PIN's hash exists only on your phone.

**Wrong-guess throttling.** After 4 wrong attempts the keypad locks out, and the
penalty doubles with each further failure (15s → 30s → 1min … up to 5 minutes).
The penalty survives closing and reopening the app, so someone can't reset the
timer by relaunching. A correct PIN clears it.

**Content-Security-Policy.** The app declares a strict CSP: it can only talk to
itself and `api.anthropic.com`. Even if a malicious merchant name or crafted CSV
made it into your data, it could not load a script, phone home, or embed the app
in another site.

## Settings → App lock
- **On/off toggle**
- **Change PIN** — enter a new one twice
- **Auto-lock** — only on reopen / 1 / 3 / 15 minutes away. Default 3 minutes.
- **Lock now**

## Settings → Danger zone

Three levels, so you never have to nuke everything just to clear the demo:

| Action | Deletes | Keeps |
|---|---|---|
| **Remove sample data** | Only the demo transactions the app shipped with | Everything you added yourself, all settings |
| **Delete all transactions** | Every transaction | Categories, budgets, income, recurring bills, PIN, API key |
| **Erase everything & restart** | Absolutely everything (you must type `ERASE`) | Nothing |

Each shows an in-app confirmation sheet — no browser popups, so they work
reliably in the installed app on your phone.

## Is the public repo safe?

Yes, with one rule: **never paste your API key into a file.** Put it in Settings,
which writes it to your browser's local storage only.

What's public: the app's code. That's it — it's the same for every visitor.
What's private: your transactions, chat history, categories, and API key all live
in your browser's local storage on your device. There is no server, no database,
no account, no analytics, no tracking. Nothing is ever uploaded anywhere except
the direct calls you trigger to Anthropic.

Anyone opening your Pages link gets a blank app with no data.

## Back up your data

Local storage is not permanent — clearing browser data wipes it.

**Settings → Export backup (.json)**, once a month. Restore with
**Settings → Restore from backup**. There's also a CSV export for spreadsheets.

Do this before changing phones, before clearing browser data, and before
"Erase all data & restart".

---

# Part 5 — Getting the most out of it

A routine that actually works:

- **Once, at the start:** import 6–12 months of CSV. Clear the review inbox.
  Set your monthly budget and 2–3 category budgets. Run *Find cheaper
  alternatives*. Work through Subscriptions and cancel one thing.
- **Daily, 5 seconds:** glance at **safe to spend** on Home before you spend.
- **Weekly, 2 minutes:** screenshot the week's transactions and import. Clear the
  review inbox.
- **Monthly, 10 minutes:** open Insights → *Versus last month*, find what moved.
  Open Save → Habits. Export a backup.

The highest-leverage screens are **Safe to spend** (changes behaviour in the
moment) and **Save → Subscriptions** (one afternoon of cancelling beats a year of
willpower).

---

# Troubleshooting

**"Erase" / "Delete" seems to do nothing.**
Fixed in v5 — destructive actions used browser popups, which installed apps
often suppress. They now use in-app confirmation sheets. If you're seeing the
old behaviour you're on a stale cached version; see the next item.

**I don't see my updates after pushing.**
The service worker is now network-first, so an online reload picks up new
versions. If a really old copy is stuck: close the app fully and reopen, or
Settings → clear site data in your browser, then reload.

**The lock screen won't accept my PIN.**
Default is `1177`. If you changed it and forgot: clearing the site's local
storage removes the stored PIN and reverts to the default — but that erases your
transactions too, so restore from your backup afterwards.

**"Add to Home Screen" is missing on iPhone.**
You're not in Safari. Chrome/Firefox on iOS can't install PWAs.

**Screenshot reading fails.**
`401` means the key was rejected — re-paste it in Settings. Otherwise check your
Anthropic account has credit. If it reads nothing, the image likely has the rows
cut off or too small — crop tighter and make sure date, merchant and amount are
all visible.

**Everything is duplicated.**
It shouldn't be — dedup runs on date + merchant + amount. If a bank exports
slightly different merchant strings across formats, they can slip through. Delete
the extras from Activity.

**A grocery store is listed as a subscription.**
It shouldn't be any more — recurring merchants and true subscriptions are now
separated. If something is genuinely miscategorised, edit its category in
Activity and it'll re-sort.

---

*FireRaven v4 — no accounts, no servers, no tracking. Your money, your device.*
