# DATASETS

Personal knowledge graph app. Single self-contained `index.html` (no build
step), PWA (`manifest.webmanifest`, `sw.js` — bump its CACHE version when
shipping asset changes), deployed to GitHub Pages by
`.github/workflows/pages.yml` on every push to `main`.
Live: https://burakekmen2708-wescha.github.io/DATASETS/

Design language (v2.0 "Glass", replaced the earlier Console look): Apple
Liquid-Glass style — system font stack, translucent `--glass` surfaces
with backdrop blur, capsule buttons, 16px cards, floating top bar under
the safe area, blue accent, inline SVG icons, no emoji in the UI. Data
lives in localStorage (`datasets-app-v1`); schema changes go through
`migrate()` in index.html and must also handle imported old exports.

`index.html` is the single canonical source (web, PWA, and the iOS bundle
via `npm run ios`). The Claude artifact preview page is derived from it
with `node tools/artifact.js > artifact.html` (adds a `<title>`, drops the
PWA head and service-worker tail) and published to the artifact URL used
throughout the project (https://claude.ai/code/artifact/45acd596-75f0-4d58-b6f9-233266007323).
Note: the artifact viewer blocks file downloads, so "Save file" in the
backup sheet is inert there (Copy works; on the phone it is the real
share sheet).

WORKFLOW RULE (Burak): visual/app changes are shown on the web/artifact
first; the phone only updates when Burak runs the cable ritual himself
(`cd ~/DATASETS && git pull && npm run ios && npx cap open ios`, ▶ in
Xcode). Never imply the phone updated on its own.

Logo: the "wild branches + smoother blend" mark, baked as a static path
(see `#logo .mark` in index.html, `icons/`, and the iOS AppIcon/Splash);
never ship the live gooey SVG filter (it renders jagged at small sizes).

Design taste (Burak, after v1.3): the aurora Monthly Wrap landed very
well — "exotic" immersive moments (full-bleed scenes, glowing gradient
typography, no boxes) are WELCOMED for celebratory/reflective surfaces.
Keep the Console restraint for daily-use UI, but don't be timid on
special moments. Avoid anything that reads as generic AI-artifact styling.

## IMPORTANT: monetization reminder

When work touches plans, pricing, premium tiers, paywalls, or monetization
in any form: FIRST read `VISION.md` and quote its highlighted passage to
Burak verbatim, as it asks. He explicitly requested this reminder.

Also: when planning future features (v1.4+), re-pitch the education
package described in `VISION.md` § "Education package" — Burak asked to
hear it again.

## STATUS: SUBMITTED TO APP REVIEW on 2026-09-08 (v1.0 build 1)

Burak submitted DATASETS 1.0 (1) to App Review on 2026-09-08 ("Waiting for
Review", automatic release, free, all countries, also available on Apple
Silicon Macs and Vision Pro). Backup feature approved and on his phone.
UPDATE 2026-09-09: Apple asked for more info (Guideline 2.1, Information
Needed, standard for new developer accounts): screen recording on a
physical device + written answers (purpose/audience, access instructions,
external services = none, regional differences = none, regulated = no).
Burak replied with the video and the answers and resubmitted on 2026-09-12.
The same text is in App Review Information > Notes.
Next session: check the review outcome first. If rejected, fix/answer the
same day (bump Build to 2 for any new upload). If approved, it is live.
Then pick up "DATASETS Business" (on hold, see BUSINESS.md).

## GOOGLE PLAY — prepared 2026-09-08, not yet submitted

Android shell added (`android/`, Capacitor 8, `npm run android` = build
www + sync). Icons/splash generated from `resources/` with
`@capacitor/assets`; hardware back button handled via `@capacitor/app`
(closes sheets/panel/menu before exiting). Play assets in `store/play/`
(feature graphic 1024x500, icon 512, phone 1080x1920, tablet 7"/10").
Full walkthrough + listing texts + data-safety answers in `PLAY.md`.
KEY CONSTRAINT: a new personal Play developer account must run a closed
test with 12+ opted-in testers for 14 days before production access
(organization accounts are exempt). Burak still needs: Play Console
account ($25), Android Studio on the Mac, signed .aab (see PLAY.md).

## AGENDA SET 2026-09-04 (items 1 and 3 DONE 2026-09-08; item 2 on hold)

Status going in: v2.0 Glass + new logo + open-from-zero centering + UI zoom
lock are on Burak's phone and he loves it ("IT IS FRICKING AWESOME").

1. **Pre-launch backup feature — REVIEW FIRST.** Already built and live on
   the web/artifact (commit "Backup feature…"), NOT yet on the phone:
   share-sheet/file backup, file restore, "Back up data · <last backup>"
   menu label, overdue-backup nudge card under the top bar (2 days after
   first use if never backed up, then every 14 days; Later snoozes a
   week; only when 3+ sources). Show it, get approval, then he runs the
   cable ritual.
2. **DATASETS Business — ON HOLD (Burak, 2026-09-08: launch first).** Burak originally said he would explain his own
   idea (2026-09-01); now he asked ME to pitch "the best possible business
   version" and, if good, implement it as a new section. Full pitch and a
   one-session implementation plan are in `BUSINESS.md`; concept mock in
   `docs/business-mock.png`. Open by asking whether he has his own concept
   to overlay, then present the pitch. Any pricing talk: quote VISION.md
   verbatim first (see below).
3. **LAUNCH.** Everything is prepared in `LAUNCH.md` (listing texts,
   keywords, privacy answers, review notes, checklist), `privacy.html`
   (served by Pages as the privacy-policy URL), App Store screenshots in
   `store/screenshots/` (regenerate with `node tools/screenshots.js`), and
   `ITSAppUsesNonExemptEncryption=NO` already in Info.plist. Walk him
   through App Store Connect + Archive/Upload (IOS.md has the mechanics);
   remind him to tick "Make available on Mac".

## LOGO: "Wild branches + Smoother blend" — APPLIED 2026-09-04

Burak picked this mark and asked to apply it immediately. It is now live in
the in-app topbar (`#logo .mark`), PWA icons, iOS AppIcon, and Splash — all
generated from the same glyph so the brand stays unified.
Recipe (stroke #58a6ff / var(--accent) in-app, round caps, fill none):

- Branches (do not change angles/shapes/widths):
  - stroke-width 2.4: `M12 12 Q 8.2 10.4 6.2 6.2`
  - stroke-width 2.0: `M12 12 Q 15.6 11.2 18.3 8.6`
  - stroke-width 2.2: `M12 12 Q 8.4 14.2 6.7 17.8`
  - stroke-width 2.7: `M12 12 Q 15.0 15.8 18.6 17.2`
- Gooey junction filter on the group (kills the crease where branches meet):
  `feGaussianBlur stdDeviation="0.55"` then `feColorMatrix` values
  `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10`.
- The filter is BAKED into a static traced path (potrace of a 1024px render)
  used everywhere — in-app SVG, icons, splash. Never ship the live filter:
  its hard alpha threshold kills anti-aliasing and looks jagged at small
  sizes. The baked path lives in index.html (`#logo .mark`, 1024-unit
  coordinates under `transform="scale(0.0234375)"`).

## RESOLVED: constellation sky & aurora colors

Burak reviewed three palette demos (Polar / Ember / Emerald) and chose to
KEEP POLAR (the current teal/blue/violet aurora) — decided 2026-09-04.
Do not re-pitch palettes unprompted; alternates exist in the session
archive if he ever asks again.
