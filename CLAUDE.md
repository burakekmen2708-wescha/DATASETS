# DATASETS

Personal knowledge graph app. Single self-contained `index.html` (no build
step), PWA (`manifest.webmanifest`, `sw.js` — bump its CACHE version when
shipping asset changes), deployed to GitHub Pages by
`.github/workflows/pages.yml` on every push to `main`.
Live: https://burakekmen2708-wescha.github.io/DATASETS/

Design language: "Console" — IBM Plex Sans/Mono, flat squared surfaces
(2px radii), line grid, steel-blue accent, inline SVG icons, no emoji in
the UI. Data lives in localStorage (`datasets-app-v1`); schema changes go
through `migrate()` in index.html and must also handle imported old exports.

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

## REMINDER: "DATASETS Business" — ASK BURAK AT THE START OF THE NEXT CONVERSATION

Burak named something called **"DATASETS Business"** (2026-09-01) and asked to
be reminded of it in the next conversation — he will explain what it is then.
Nothing else is known about it yet. At the start of the next session on this
project, proactively ask: "You wanted me to remind you about 'DATASETS
Business' — what is it?" Do not guess at its meaning before he explains.

## LOGO CANDIDATE (chosen 2026-09-04, NOT YET APPLIED)

Burak picked the "Wild branches + Smoother blend" mark as the candidate to
replace the current box mark. DO NOT apply it anywhere until he explicitly
says so — the current box mark stays live in the app, icons, and splash.
Recipe (viewBox "-4.5 -4.5 33 33", stroke #58a6ff, round caps, fill none):

- Branches (do not change angles/shapes/widths):
  - stroke-width 2.4: `M12 12 Q 8.2 10.4 6.2 6.2`
  - stroke-width 2.0: `M12 12 Q 15.6 11.2 18.3 8.6`
  - stroke-width 2.2: `M12 12 Q 8.4 14.2 6.7 17.8`
  - stroke-width 2.7: `M12 12 Q 15.0 15.8 18.6 17.2`
- Gooey junction filter on the group (kills the crease where branches meet):
  `feGaussianBlur stdDeviation="0.55"` then `feColorMatrix` values
  `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10`.
- When applying for real, bake the filtered result into a static path (or
  keep the filter — but test it renders on iOS WKWebView + as PNG icons).

## RESOLVED: constellation sky & aurora colors

Burak reviewed three palette demos (Polar / Ember / Emerald) and chose to
KEEP POLAR (the current teal/blue/violet aurora) — decided 2026-09-04.
Do not re-pitch palettes unprompted; alternates exist in the session
archive if he ever asks again.
