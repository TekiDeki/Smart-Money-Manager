# Smart Money Manager

A browser-local ledger for **income, expenses and monthly budget limits**, with exact totals, reviewed imports and offline charts.

**[Open the app](https://tekideki.github.io/Smart-Money-Manager/)** · [Source](https://github.com/TekiDeki/Smart-Money-Manager) · [Apache-2.0](LICENSE)

## What it does

- Add, edit, delete, search and paginate entries in nine categories. Amounts can be zero or positive; refunds can be recorded as income. All exports contain the **entire ledger**, regardless of visible filters.
- Switch between a selected month and all recorded time. Cards and charts use that period; search/type/category filters affect only the transaction list. **Net cash flow is not a verified bank balance** and does not include unrecorded opening balances or bank activity.
- Set recurring monthly budget **limits**, compare them with actual expense entries for the selected budget month, and see remaining amounts or overruns. Limits apply across months; changing a limit is not a historical budget revision.
- Use one explicitly selected currency per ledger: RON, RSD, EUR, USD, GBP or CHF. Language changes **never** change currency. Selecting another currency only relabels amounts, after confirmation; there is **no exchange-rate conversion** or multi-currency accounting.
- English, Romanian, Serbian Latin and Serbian Cyrillic; light/dark themes; keyboard-operated controls and exact-data tables alongside charts.
- Keep using the cached app and bundled charts offline after a successful online load. There is no runtime CDN dependency.

## Exact amounts, clear limits

Amounts accept a dot **or** comma decimal separator and up to **six decimal places**. Thousands separators, exponent notation and partially numeric input are rejected. `1,234` means **1.234**, not 1,234 units.

Per-entry amounts are between 0 and **1,000,000,000**; budget limits must be greater than zero. Valid dates are 1900-2100. A ledger is limited to **10,000 entries**; import files to **5,000,000 bytes**. Browser storage quotas can impose a lower practical capacity, especially because legacy data is deliberately retained.

Sums use `BigInt` at a scale of one million, and exact decimal formatting is retained even for large totals. Chart geometry uses floating-point values for visualization; its accompanying tables and tooltips show the exact amounts. This is a personal journal, not double-entry accounting, financial advice, tax software or a bank service.

## Saving and existing data

Financial data is written to a single new local-storage value, **`smm_data_v3`**, only after full validation. The stored value is written before in-memory data or forms are changed. A failed write leaves the previous ledger and entered form text in place.

The old **`smm_transactions_v2`** and **`smm_budgets_v2`** keys are read when no v3 ledger exists and are **never overwritten or deleted by this version**. Theme/language preferences retain their existing keys. No startup financial write, silent reset or automatic recurrence generation occurs. The first save of a nonempty legacy ledger requires explicit confirmation of its inferred currency.

Corrupt data, unsupported schema versions or legacy values outside the supported precision/range enter **read-only recovery mode**, rather than silently discarding or rounding entries. Use **Download raw local recovery data**, keep the file private and obtain help inspecting it locally. Raw recovery files contain original stored strings and are **not normal import files**; they do not automatically repair a corrupt ledger. Do not clear browser storage as a troubleshooting step.

Do not edit simultaneously in old and new versions or several tabs. Modern browsers with Web Locks serialize cooperating writes; a changed stored snapshot blocks stale writes. Without Web Locks, snapshot checking is a best-effort safeguard, not an atomic multi-tab compare-and-swap. The old v2 keys are recovery copies, **not synchronized mirrors** of the new ledger. If an old version changes them, export raw recovery data and reconcile deliberately; do not assume old-version changes have been merged.

## Monthly entries: always review first

A confirmed monthly template produces **journal copies**, not payments, bank instructions or notifications. Use **Review due monthly entries**, inspect the preview, and apply it explicitly. Nothing is generated automatically at launch.

- Copies retain the template’s day, clamped to the end of shorter months: January 31 → February 28/29 → March 31.
- Nothing dated after the browser’s local today is generated. One source/month pair is generated once; copies are not themselves templates.
- Deleting a generated copy records a removed-occurrence marker so it is not recreated. JSON backups retain these markers; CSV does not.
- Old `recurring` flags are retained but remain **unconfirmed** because old generated entries cannot be reliably distinguished from separate legitimate entries. An explicit edit plus checking the monthly-template box starts future copies **next month**, without guessing historical duplicates.
- New templates normally begin copying in the month after their original entry. Existing generated entries are not rewritten when a template is edited or stopped. A review is bounded to 1,000 due copies and 120 months per template; an older template must be reviewed/edited first. The preview shows the total count and the first 50 entries.

## Backups and imports

**JSON is the complete backup**: schema version, currency, all entries, budget limits and removed-occurrence markers. Keep regular private copies outside the browser. CSV is an exchange format containing transactions and their recurrence metadata, **not** budgets, ledger currency or removed-occurrence markers.

Every import has a validate/preview step and an explicit apply step. A merge is the default:

- Identical IDs with identical normalized contents are skipped.
- An existing ID with different contents, differing budget limits for the same category or a currency mismatch rejects the entire merge.
- Different IDs remain separate, even for otherwise identical legitimate entries. There is no destructive fingerprint-based deduplication.
- Whole-ledger replacement is available only after an explicit backup/replacement acknowledgement. No financial write happens merely by selecting or previewing a file.

Both legacy JSON (`transactions` and `budgets`) and the original four localized CSV formats are supported when their records validate. Currency-less files require currency selection and confirmation. Legacy CSV has no IDs, so **reimporting it can create duplicates**; its preview warns about this.

CSV supports quoted commas, double quotes and newlines. Export prefixes potentially formula-like descriptions with an apostrophe and records that reversible escape in a dedicated column. Reimport restores the exact text. Spreadsheet behavior varies: treat exported files as private data, not trusted executable spreadsheet content. Do not remove machine columns if you want a reliable roundtrip.

## Privacy and limitations

No app account, bank connection, cloud sync, tracking script or analytics is used. Application financial data is not submitted to a server. Static hosting still receives ordinary resource requests and network metadata. Chart.js is embedded in `index.html`, rather than fetched from a third-party CDN.

**Local data is unencrypted.** It can be accessed by other software with browser access or scripts sharing the same origin. GitHub Pages project sites under one host share an origin; this is not a vault or an isolation guarantee. Browser clearing, device failure, private-mode cleanup or changing origin/browser can make data unavailable. Browser/file download behavior and storage permissions differ. Keep private backups; never publish financial JSON/CSV/recovery files to this repository.

## Install and offline use

The **Install app** button uses the native browser prompt when available; otherwise it displays localized browser-specific instructions. Installation and availability depend on the browser/device, HTTPS or trustworthy localhost. A normal tab cannot reliably detect every prior installation, and accepting a prompt does not prove installation finished.

After a successful online load, the scoped service worker caches the app shell, icons and license notices. Updates do not force a reload or clear financial data. On an older cached version, revisit online and reload **when convenient**, after saving/exporting anything needed. The existing manifest start URL and icon identity are preserved; orientation now permits both portrait and landscape.

## Run and test

The main application remains one HTML file with inline styles, application code and its pinned chart library. No build step is needed to use or host the committed app.

```sh
git clone https://github.com/TekiDeki/Smart-Money-Manager.git
cd Smart-Money-Manager
python -m http.server 8000
# Open http://localhost:8000/
```

Opening `index.html` directly supports basic use where file-origin storage is permitted, but service workers/normal PWA installation require HTTPS or localhost. Local browser storage is tied to the origin; another port or a downloaded file does not automatically share the live app’s data. Use JSON exports to transfer deliberately.

Core regression tests require Node.js 18+ and no npm install:

```sh
node tests/core.test.cjs
```

The suite exercises exact amounts, Gregorian dates, legacy normalization, merge conflicts, full CSV roundtrips, reviewed recurrence and capacity limits. Additional release checks cover real browser interactions, four languages/two themes, responsive widths, storage failures, hostile input, offline operation and PWA upgrades. Automated accessibility checks are useful but are not a WCAG certification; simulated installation checks are not physical-device installation guarantees.

For GitHub Pages, deploy the existing `main` branch at `/ (root)` or an equivalent static workflow. Keep `index.html`, `sw.js`, `manifest.json`, icons and license notices together.

## Dependencies and licenses

Application code: **Apache-2.0**, © 2026 TekiDeki. See [LICENSE](LICENSE) and [NOTICE](NOTICE).

Embedded **Chart.js 4.5.1**, with its bundled **@kurkle/color 0.3.2**, is MIT-licensed. See [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt) for the preserved notices and the verified official Chart.js npm tarball SHA-512 integrity value. There is no D3.js dependency. Releasing application code under Apache-2.0 does not relicense bundled MIT code.

[Support the project](https://paypal.me/TekiDeki) · [@TekiDeki](https://github.com/TekiDeki)
