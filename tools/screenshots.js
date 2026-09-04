// App Store screenshots + the DATASETS Business concept mock, rendered
// from index.html itself with the demo content.
//
//   npm i --no-save playwright-core   (once)
//   CHROMIUM=/path/to/chromium node tools/screenshots.js
//
// Output: store/screenshots/<size>/N-name.png and docs/business-mock.png
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const URL = 'file://' + path.join(ROOT, 'index.html');
const EXE = process.env.CHROMIUM || '/opt/pw-browsers/chromium';
const SIZES = {
  'iphone-6.9': { w: 440, h: 956, dpr: 3 },   // 1320 x 2868
  'iphone-6.7': { w: 430, h: 932, dpr: 3 },   // 1290 x 2796
  'ipad-13':    { w: 1032, h: 1376, dpr: 2 }, // 2064 x 2752
};

// the app loads offline; skip external requests (fonts) so page loads are instant
async function offline(page) {
  await page.route(/^https?:\/\//, (route) => route.abort());
}
async function fresh(page, scheme) {
  await page.emulateMedia({ colorScheme: scheme });
  // forget the per-tab view so every shot starts from the fitted map
  // (a zoomed-out view would otherwise re-enter Constellation)
  try { await page.evaluate(() => sessionStorage.clear()); } catch (e) { /* no page yet */ }
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  // quiet the first-open surfaces so the map itself is the subject
  await page.evaluate(() => {
    document.querySelectorAll('.overlay').forEach(function (o) { o.hidden = true; });
    ['wrap', 'backupNudge'].forEach(function (id) { var e = document.getElementById(id); if (e) e.hidden = true; });
  });
}
const click = (page, id) => page.evaluate((i) => document.getElementById(i).click(), id);

async function storeShots(browser) {
  for (const [name, s] of Object.entries(SIZES)) {
    const dir = path.join(ROOT, 'store', 'screenshots', name);
    fs.mkdirSync(dir, { recursive: true });
    const ctx = await browser.newContext({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: s.dpr });
    const page = await ctx.newPage();
    await offline(page);
    const shot = (f) => page.screenshot({ path: path.join(dir, f) });

    await fresh(page, 'light');
    await click(page, 'mFit'); await page.waitForTimeout(800);
    await shot('1-map.png');

    await fresh(page, 'dark');
    await page.locator('.node:not(.me)').first().click(); await page.waitForTimeout(800);
    await shot('2-panel.png');

    await fresh(page, 'dark');
    await click(page, 'mCosmos'); await page.waitForTimeout(2200);
    await shot('3-constellation.png');

    await fresh(page, 'dark');
    await click(page, 'mWrap'); await page.waitForTimeout(1600);
    await shot('4-wrap.png');

    await fresh(page, 'light');
    await click(page, 'mResurface'); await page.waitForTimeout(700);
    await shot('5-resurface.png');

    await fresh(page, 'light');
    await page.locator('#legend button.lgroup').first().click(); await page.waitForTimeout(600);
    await shot('6-groups.png');

    await ctx.close();
    console.log('store screenshots:', name);
  }
}

// A seeded "Business space" as it would look — used only for the pitch.
async function businessMock(browser) {
  const ctx = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 3 });
  const page = await ctx.newPage();
  await offline(page);
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto(URL, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(600);
  await page.evaluate(() => {
    const day = 86400000, now = Date.now();
    const uid = () => Math.random().toString(36).slice(2, 10);
    const gBW = { id: uid(), name: 'Brand Week Florida 2026', color: '#e5484d' };
    const gQ4 = { id: uid(), name: 'Q4 pipeline', color: '#d9a441' };
    const gCE = { id: uid(), name: 'Content engine', color: '#17a2a8' };
    const src = [
      ['Maya Chen — Lumen Skincare', 'person', 'Client · active', [gQ4.id, gBW.id], 3, 'Wants 12 AI product videos a month. Decision: start with 4, prove the CTR lift, then scale.'],
      ['Daniel Ortiz — Ortiz Realty', 'person', 'Lead', [gBW.id, gQ4.id], 9, 'Met at Brand Week. Promise: send the avatar walkthrough demo by Friday.'],
      ['Nina Kaplan', 'person', 'Advisor', [], 31, 'Charge for outcomes, not deliverables. Price the result, not the hours.'],
      ['Leo Marsh — editor', 'person', 'Partner', [gCE.id], 2, 'Handles final cuts, 48h turnaround. Wants briefs as shot lists, not paragraphs.'],
      ['Studio Arclight', 'other', 'Competitor', [], 14, 'They pitch “human directors + AI”. Our angle is speed: same-week delivery.'],
      ['ElevenLabs', 'other', 'Tool', [gCE.id], 5, 'Voice quality dips on long scripts — keep every take under 90 seconds.'],
      ['Meta Ads', 'other', 'Platform', [gCE.id], 1, 'Reels with a face in the first frame hold 2× longer. Lead with the avatar.'],
      ['Brand Week Florida 2026', 'event', 'Event', [gBW.id], 9, 'Best conversations happened at the side events, not the booth. Next year: skip the booth.'],
    ];
    const R = 250, datasets = src.map((s, i) => {
      const a = -Math.PI / 2 + i * (Math.PI * 2 / src.length) + 0.25;
      const r = R + (i % 2 ? 70 : 0);
      return { id: uid(), name: s[0], type: s[1], x: Math.round(Math.cos(a) * r), y: Math.round(Math.sin(a) * r),
               groups: s[3], links: [], entries: [{ id: uid(), text: s[5], at: now - s[4] * day }], bizKind: s[2] };
    });
    datasets[0].links.push(datasets[7].id); datasets[7].links.push(datasets[0].id);
    datasets[1].links.push(datasets[7].id); datasets[7].links.push(datasets[1].id);
    const st = { meName: 'Wescha', datasets, groups: [gBW, gQ4, gCE], firstOpenAt: now - 40 * day,
                 lastBackupAt: now - day, lastResurfaceDay: new Date().toDateString(), wrapSeen: { all: true } };
    localStorage.setItem('datasets-app-v1', JSON.stringify(st));
    sessionStorage.clear();
  });
  await page.goto(URL, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(1600);
  await page.evaluate(() => {
    document.querySelectorAll('.overlay').forEach(function (o) { o.hidden = true; });
    ['wrap', 'backupNudge'].forEach(function (id) { var e = document.getElementById(id); if (e) e.hidden = true; });
    // the Business space's brass accent and vocabulary (mock only)
    const rs = document.documentElement.style;
    rs.setProperty('--accent', '#d9a441'); rs.setProperty('--accent-soft', 'rgba(217,164,65,.16)');
    document.querySelector('.node.me .kind').textContent = 'Business map of';
    const st = JSON.parse(localStorage.getItem('datasets-app-v1'));
    st.datasets.forEach(function (d) {
      const n = document.querySelector('.node[data-id="' + d.id + '"] .kind');
      if (n) { const svg = n.querySelector('svg'); n.textContent = ''; if (svg) n.appendChild(svg); n.appendChild(document.createTextNode(d.bizKind)); }
    });
  });
  await click(page, 'mFit'); await page.waitForTimeout(800);
  fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true });
  await page.screenshot({ path: path.join(ROOT, 'docs', 'business-mock.png') });
  await ctx.close();
  console.log('business mock: docs/business-mock.png');
}

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  await storeShots(browser);
  await businessMock(browser);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
