# DATASETS Business — the pitch

*Prepared 2026-09-04 for the next session. Burak asked for "a good pitch and
the best possible business version"; he may also have his own concept in
mind — hear it first, then overlay this.*

## The one-liner

**DATASETS Business is a second map inside the same app: your business in
the center, and everything that shapes it around it — clients, partners,
suppliers, mentors, competitors, tools, events — with every conversation,
lesson and decision written on the wire that connects you.**

Personal DATASETS answers "what have I learned, and from whom?"
Business DATASETS answers "who is my business made of, what did each of
them teach or cost me, and who am I neglecting?"

## Why it's the right move

1. **It's the same product, not a new one.** The center-node-and-branches
   model, timestamped entries, groups, connections, resurface, the wrap,
   the constellation — all of it maps 1:1 onto a business. Zero new mental
   model for the user, mostly new *vocabulary* and a few business-only
   features. That means it can be built in one focused session and shipped
   as v2.1, not a half-year rewrite.
2. **It is the natural premium tier.** The personal map is the free hook
   (delightful, shareable, App Store screenshots). The Business space is the
   thing a founder, freelancer, agency owner or salesperson pays for. Nothing
   we shipped free so far has to be walked back.
3. **It's Burak's own use case.** Wescha, Brand Week Florida 2026, the
   people met there — the example group already lives in the personal map
   and clearly wants a business home. Build for yourself first; the first
   user is the strongest signal.
4. **CRMs are the wrong shape for this.** HubSpot-style tools are tables of
   contacts and pipelines. Founders don't think in tables; they think in a
   web of relationships and lessons. Nothing on the App Store shows "my
   business as a living map". That is the wedge.

## What the Business space contains

### Center node
The business itself: "Wescha" (with a short tagline under it, like the
"Datasets of" line today). One tap on the center node's label switches
spaces: **Personal ⇄ Business**. The whole map, legend, search results and
menu follow the active space. The Business space gets its own accent tint
(a warm brass/amber on the same Polar sky) so you always know where you
are — "gold = money".

### Source types (replace the personal list in this space)
Client · Partner · Supplier / Vendor · Investor · Mentor / Advisor ·
Competitor · Tool / Platform · Event · Team member.

Each card keeps the same shape as today, plus a few optional business
fields: company, role, a contact line (email / phone / handle, tappable),
and a **status** pill — lead / active / paused / closed / lost.

### Entries (the wires stay the product)
Unchanged mechanically — timestamped notes — but framed as meeting notes,
decisions, promises, lessons. Optional one-tap tags on an entry:
`lesson`, `decision`, `promise`, `next step`. Promises and next steps show
up in a small "open loops" list.

### Groups = campaigns / projects / deals
Brand Week Florida 2026 is already the perfect example. Same colored
grouping and filter as today; a group can carry a date range and a
one-line outcome ("Result: 2 leads, 1 signed").

### Business-only features (the reasons to pay)
1. **Relationship freshness.** Every source remembers when you last touched
   it (last entry or a one-tap "Touched today"). Cards and constellation
   stars fade the longer you leave someone; the resurface card in this
   space becomes *"You haven't spoken to [Client] in 31 days — last time
   they said …"*. This is the killer feature: it turns the map into an
   early-warning system for neglected relationships.
2. **Open loops.** Entries tagged promise / next step, across all sources,
   in one list, oldest first. Tap one to jump to the source.
3. **Business monthly wrap.** The aurora wrap, business edition: people
   touched, new relationships, groups/campaigns closed, lessons of the
   month, "3 people going cold".
4. **Status filter.** One tap to see only active clients, only leads, only
   what's paused.
5. **Export per space** — the backup file already covers both spaces;
   add a "share this group as a brief" text export later.

## What it is NOT (yet)
- Not multi-user / shared. That needs sync and a backend; it belongs to
  the subscription era described in VISION.md. Local-only Business is the
  right first step and is fully sellable on its own.
- Not a pipeline/revenue tracker. No currency math in v2.1. Status pills
  are enough; numbers can come later if users ask.

## Pricing (READ THIS FIRST when it comes up)
Per CLAUDE.md, before any pricing decision quote the VISION.md passage to
Burak verbatim. The short version of how Business fits that passage:
while the app is local-only, Business is the one-time unlock (the
"~$4.99" tier); when sync exists, Business + sync becomes the subscription.
Personal stays free.

## Implementation plan (v2.1 "Spaces") — one session

1. **Data model.** `state.spaces = [{ id, kind: 'personal'|'business',
   meName, tagline, accent, datasets, groups }]`, `state.activeSpace`.
   `migrate()` wraps the existing top-level datasets/groups into the
   personal space (imports of old exports handled the same way). Backup
   file contains all spaces.
2. **Switcher.** Center node label tap → animated crossfade to the other
   space (map fades out, re-fits, fades in with the new accent). Menu item
   as fallback. Search shows results from both spaces with a small space
   tag.
3. **Vocabulary per space.** Source type list, "Add dataset" copy, center
   node subtitle, resurface wording all read from the active space's kind.
4. **Business fields + status pill** on the card and panel.
5. **Freshness.** `lastTouchAt` per source (max of entry timestamps, or the
   "Touched today" button). Card ring / constellation brightness by age;
   resurface in Business space picks the coldest active relationship.
6. **Open loops** list (entries with tag promise/next step) in the menu.
7. **Business wrap** variant of the monthly wrap (reuse the scene, swap the
   steps).
8. Tests in the smoke suite for space switching, migration and backup
   round-trip.

Mock of the idea: `docs/business-mock.png` (the app with a Business space
seeded — Wescha in the center, clients/partners/events around it).
