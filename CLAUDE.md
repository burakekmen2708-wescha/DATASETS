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
