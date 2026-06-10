import { chromium } from 'playwright';

const OUT = 'scripts/shots';
const URL = 'http://localhost:3000';

const fractions = [0, 0.25, 0.5, 0.7, 0.85, 0.92];

// Headed: headless SwiftShader can't keep up with the 26MB tower GLB and
// page.screenshot times out waiting for a compositor frame.
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.log('PAGEERROR:', e.message));
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE.ERR:', m.text()); });

await page.goto(URL, { waitUntil: 'networkidle', timeout: 120000 });
// Give the 26MB skyscraper GLB + sky GLB time to decode and the canvas to draw.
await page.waitForTimeout(8000);

const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
console.log('scrollHeight(px scrollable):', scrollHeight);

for (const f of fractions) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(scrollHeight * f));
  await page.waitForTimeout(1600); // let camera smoothing settle
  const name = `${OUT}/shot_${String(Math.round(f * 100)).padStart(3, '0')}.png`;
  await page.screenshot({ path: name, timeout: 90000 });
  console.log('saved', name);
}

await browser.close();
console.log('DONE');
