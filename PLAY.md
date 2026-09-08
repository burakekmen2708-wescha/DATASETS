# DATASETS — Google Play launch kit

Prepared 2026-09-08. Same app, same `index.html`; the Android shell lives in
`android/` (Capacitor). Build and sign on the Mac with Android Studio, then
fill in Play Console with the texts below.

## READ FIRST: the 12-tester rule

Google requires **new personal developer accounts** (created after
Nov 2023) to run a **closed test with at least 12 testers opted in for 14
continuous days** before they may publish to production. Organization
accounts are exempt. So for a personal account the realistic timeline is:

1. Today: create the account, upload the bundle to a **Closed testing**
   track, invite 12+ testers (friends, family; a Google Group works).
2. Testers install via the opt-in link and keep the app for 14 days.
3. After 14 days: **Apply for production access** in Play Console
   (short questionnaire about the test), usually approved in a few days.
4. Then promote the same release to **Production**.

If Burak registers as an organization (needs a D-U-N-S number and a
business), the closed-test requirement does not apply.

## One-time setup on the Mac

1. **Google Play Console** account: https://play.google.com/console → pay
   the one-time $25 fee → verify identity (ID + phone; can take 1–2 days).
2. **Android Studio**: https://developer.android.com/studio → install →
   first launch installs the Android SDK. (Includes its own JDK.)
3. In the repo: `cd ~/DATASETS && git pull && npm install`.

## Build the signed bundle (.aab)

```
cd ~/DATASETS && git pull && npm run android && npx cap open android
```

In Android Studio (first open takes a few minutes while Gradle syncs):

1. Menu **Build → Generate Signed App Bundle / APK…** → **Android App
   Bundle** → Next.
2. Key store: **Create new…** → path e.g. `~/datasets-upload-key.jks`,
   choose a password, alias `datasets`, key password, validity 25+ years,
   Certificate: first/last name Burak Ekmen, organization `DATASETS`,
   country `US` → OK. **Back up this .jks file and the passwords** (iCloud
   Drive or a password manager). Losing it makes future updates painful.
3. Next → build variant **release** → Create.
4. Output: `android/app/release/app-release.aab`. That file is what you
   upload.

Version bumps for later releases: `android/app/build.gradle` →
`versionCode` (integer, +1 every upload) and `versionName` ("1.0" → "1.1").

## Play Console: create the app

Play Console → **Create app**: Name `DATASETS` · Default language
English (United States) · App (not game) · **Free** · accept declarations
→ Create app.

Then the **Dashboard** lists the tasks. Values for each:

### Set up your app
- **Privacy policy** → `https://burakekmen2708-wescha.github.io/DATASETS/privacy.html`
- **App access** → "All functionality is available without special access"
- **Ads** → No, the app does not contain ads
- **Content rating** → start questionnaire → email → category
  **Utility, Productivity, Communication, or Other** → answer **No** to
  every question → Save → Submit (result: Everyone / 3+ / PEGI 3)
- **Target audience** → age group **18 and over** (simplest; the app is
  not designed for children) → not appealing to children → Save
- **News app** → No
- **COVID-19 contact tracing** → No
- **Data safety** → "Does your app collect or share any of the required
  user data types?" → **No** → Save (label: "No data collected")
- **Government apps** → No
- **Financial features** → none (my app doesn't provide any)
- **Health** → my app is not a health app
- **App category** → App · **Productivity** · tags optional
- **Store listing contact details** → your email; phone optional; website
  `https://burakekmen2708-wescha.github.io/DATASETS/`

### Main store listing
- **App name** (30): `DATASETS`
- **Short description** (80):
  `Your personal knowledge map: people, books and lessons, with you at the center.`
- **Full description** (4000): the same text as the App Store description
  in `LAUNCH.md` (the no-dash version).
- **App icon** (512×512 PNG): `store/play/icon-512.png`
- **Feature graphic** (1024×500, required): `store/play/feature-graphic.png`
- **Phone screenshots** (2 to 8, 9:16): `store/play/phone/` (1080×1920)
- **7-inch tablet screenshots**: `store/play/tablet-7/` (1200×1920)
- **10-inch tablet screenshots**: `store/play/tablet-10/` (1600×2560)
- Video: none.

### Release
- **Testing → Closed testing → Create track** (name "Alpha") → **Create
  new release** → upload `app-release.aab` → Play App Signing: accept
  (Google keeps the app signing key; your .jks is the upload key) →
  Release name `1.0 (1)` → Release notes:
  `First release. Your personal knowledge map: sources, notes on the wires, groups, connections, daily resurfacing, Monthly Wrap and Constellation view. Private and offline.`
- **Testers** tab → create an email list with 12+ addresses (or a Google
  Group) → Save → copy the **opt-in URL** and send it to the testers.
- **Countries** → add all.
- Review and roll out. Google reviews test releases too (usually hours to
  a couple of days).
- After 14 days with 12+ opted-in testers → Dashboard → **Apply for
  production access** → answer the questions → wait for approval →
  **Production → Create new release** → pick the same bundle from the
  library → roll out.

## Android notes on the app itself
- Same `index.html`; edge-to-edge insets are handled by Capacitor
  (`adjustMarginsForEdgeToEdge: auto` in `capacitor.config.json`).
- The hardware/gesture **back** button closes whatever is open (sheet,
  panel, menu, wrap) and only leaves the app from the bare map
  (`@capacitor/app` listener in index.html).
- Icons/splash are generated into `android/app/src/main/res` from
  `resources/` by `npx @capacitor/assets generate --android`. Re-run after
  changing the logo.
- Screenshots for Play: `PLAY=1 node tools/screenshots.js` writes
  `store/play/` (phone 1080×1920, tablets 1200×1920 / 1600×2560) and the
  feature graphic.
