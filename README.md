# DATASETS

A personal knowledge graph. Everything valuable you learn — from books, movies,
people, podcasts, talks — usually evaporates instead of landing in long-term
memory. DATASETS gives every source its own node wired to your name in the
center, so your extracted lessons build up into one searchable mind map instead
of scattering across notepads and journals.

## Features

- **Node graph canvas** — your name in the center, wires out to a box per
  source (person, book, movie, podcast, event…). Pan by dragging, zoom with the
  mouse wheel or the corner controls, drag nodes to rearrange them.
- **Click to open** — every node opens an editing panel: rename the source,
  change its type, and write/edit the extracted knowledge. Everything autosaves.
- **Search** — the top search bar matches source names, notes, and group names.
  Picking a result flies the camera to the node, pulses it, and opens it.
- **Add a dataset** — the `+ Add dataset` button (or double-click on empty
  canvas to add one at that spot).
- **Groups** — tag datasets into groups (e.g. *Brand Week Florida 2026*).
  Each group has a color shown on the node strip, its dots, and its wire.
  The legend in the bottom-left filters the graph to one group.
- **Backup** — the `⋯` menu exports/imports everything as JSON.

Data is stored in your browser's `localStorage` — private to your device.
Use Export for backups or to move between devices.

## Running it

It is a single self-contained `index.html` — no build step, no dependencies.

- Open `index.html` in any modern browser, or
- serve the folder (`python3 -m http.server`) and open `http://localhost:8000`, or
- enable **GitHub Pages** on this repo (Settings → Pages → deploy from `main`)
  to get a permanent URL.

## Keyboard

- `/` focuses search · `↑`/`↓` navigate results · `Enter` opens
- `Esc` closes panels and dialogs
