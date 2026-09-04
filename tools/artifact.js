// Derive the Claude artifact preview page from index.html:
// same app, minus the PWA head and the service-worker tail.
// Usage: node tools/artifact.js > /path/to/artifact.html
const fs = require('fs');
const path = require('path');
const idx = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const start = idx.indexOf('<link rel="stylesheet" href="https://fonts.googleapis.com');
const end = idx.indexOf('\n<script>\nif ("serviceWorker" in navigator');
if (start < 0 || end < 0) throw new Error('index.html boundaries not found');
process.stdout.write('<title>DATASETS</title>\n' + idx.slice(start, end).trimEnd() + '\n');
