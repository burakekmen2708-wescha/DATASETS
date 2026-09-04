# DATASETS — App Store launch kit

Everything needed to fill in App Store Connect, prepared 2026-09-04. The
technical steps (Archive → Upload) are in IOS.md; this file is the content.

## Checklist

- [ ] App Store Connect → My Apps → **+ New App**: iOS, name **DATASETS**,
      primary language English (U.S.), bundle ID `com.burakekmen.datasets`,
      SKU `datasets-001`, full access.
- [ ] Xcode → App target → **General**: Version `1.0`, Build `1`
      (bump Build on every upload).
- [ ] Xcode: destination **Any iOS Device (arm64)** → Product → **Archive**
      → Distribute App → App Store Connect → Upload.
- [ ] Wait for processing (15–30 min) → the build appears under TestFlight.
- [ ] App page → **1.0 Prepare for Submission**: paste the texts below,
      upload screenshots from `store/screenshots/`, pick the build.
- [ ] **App Privacy** → Get started → "Do you collect data?" → **No** →
      publish (label shows "Data Not Collected").
- [ ] **Pricing and Availability** → Free → all countries → tick
      **"Make this app available on Mac"** (iPhone & iPad apps on Apple
      silicon). No extra work — the same build runs on Macs.
- [ ] **App Review Information**: contact name/phone/email; no sign-in
      required (leave demo account blank); notes below.
- [ ] Age rating questionnaire → all "None" → **4+**.
- [ ] Export compliance: already answered in the project
      (`ITSAppUsesNonExemptEncryption = NO`), so no prompt on upload.
- [ ] **Submit for Review**. Typical first review: 1–3 days.

## Listing texts

**Name** (30): `DATASETS`

**Subtitle** (30): `Your personal knowledge map`

**Promotional text** (170, editable without a new build):
`Every person, book, podcast and moment that taught you something — as one living map with you at the center. Notes on the wires, lessons that resurface.`

**Description** (4000):
```
DATASETS is a map of everything that shaped how you think.

You sit in the center. Around you: the people, books, podcasts, movies,
courses and moments you learned from — each one a source, connected to
you by a wire. Tap a source and write down what it taught you. Over time
the map becomes your knowledge, drawn.

WRITE ON THE WIRES
Each source keeps a timeline of dated notes: the lesson from a mentor, the
line from a book, the idea from a podcast episode. Add a note in seconds.

GROUP WHAT BELONGS TOGETHER
Color-coded groups tie sources to an event, a project or a season of your
life — "Brand Week Florida 2026", "Startup year one", "Books that changed
my mind". Tap a group to light up only its sources.

CONNECT THE DOTS
Link sources to each other when one idea led to another. The map shows
the web of influence, not just a list.

REMEMBER WHAT YOU LEARNED
Every day DATASETS resurfaces one lesson from your own map, so what you
wrote down does not fade. At the end of each month, a Monthly Wrap — a
quiet, glowing recap of what you added and learned.

CONSTELLATION VIEW
Zoom out and see your knowledge as a night sky — every source a star,
older lessons fading, fresh ones bright.

FIND ANYTHING
Search flies straight to the source and opens it.

PRIVATE BY DESIGN
Everything stays on your device. No account, no tracking, no analytics.
One tap backs your whole map up to a file you own.

Designed to feel at home on iPhone: fluid glass surfaces, native gestures,
light and dark themes.
```

**Keywords** (100 chars, comma-separated, no spaces after commas):
`knowledge,notes,mind map,second brain,lessons,learning,books,podcasts,people,memory,journal,graph`

**Category**: Primary **Productivity**, Secondary **Education**.

**Support URL**: `https://burakekmen2708-wescha.github.io/DATASETS/`
**Marketing URL** (optional): same.
**Privacy Policy URL**: `https://burakekmen2708-wescha.github.io/DATASETS/privacy.html`
**Copyright**: `2026 Burak Ekmen`

**What's New in This Version** (1.0):
`First release. Your personal knowledge map: sources, notes on the wires, groups, connections, daily resurfacing, Monthly Wrap and Constellation view. Private and offline.`

## App Review notes
```
DATASETS is a fully offline personal knowledge-map app. No account or
sign-in exists. All data is stored on the device; the app makes no network
requests. Demo content is pre-loaded on first launch so the map is not
empty. Backup uses the standard iOS share sheet to save a JSON file the
user owns.
```

## App Privacy answers
- Data collection: **No, we do not collect data from this app.**
  (Truthful: no analytics, no accounts, no network calls; backups are
  user-initiated files handled by the system share sheet.)
- Privacy policy page: `privacy.html` in this repo, served by GitHub
  Pages at the URL above.

## Screenshots
Generated from the app with the demo content, in `store/screenshots/`:
- `iphone-6.9/` — 1320×2868 (iPhone 16 Pro Max class; the required size)
- `iphone-6.7/` — 1290×2796 (iPhone 15 Pro Max class)
- `ipad-13/` — 2064×2752 (iPad Pro 13", required because the app also
  installs on iPad)

Order to upload (first two matter most — they show in search results):
1. map — the whole graph, light theme
2. panel — a source opened with its dated notes, dark theme
3. constellation — the night-sky view
4. wrap — the Monthly Wrap aurora
5. resurface — today's lesson card
6. groups — color groups lighting up part of the map

Regenerate any time with `node tools/screenshots.js` (needs
`playwright-core` and a Chromium; see the script header).

## After approval
- Turn on **App Store Connect → notifications** for review status.
- Reply to reviews from App Store Connect; keep the promotional text
  fresh (it can change without a new build).
- Next version: bump Build (and Version for user-visible releases), then
  `git pull && npm run ios && npx cap open ios` → Archive → Upload → add
  the build to a new version in App Store Connect → Submit.
