import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForTimeout(8000);

const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
for (const f of [0, 0.1, 0.25, 0.5, 0.7, 0.92]) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(scrollHeight * f));
  await page.waitForTimeout(2500);
  const cam = await page.evaluate(() => JSON.stringify(window.__skycam, (k, v) => (typeof v === 'number' ? Math.round(v * 100) / 100 : v)));
  console.log(f, cam);
  await page.screenshot({ path: `scripts/shots/diag_${String(Math.round(f * 100)).padStart(3, '0')}.png`, timeout: 90000 });
}
await browser.close();
