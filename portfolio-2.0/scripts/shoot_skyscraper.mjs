import { chromium } from 'playwright';

// headless:false — the GLB decode needs a real GPU compositor (per repo notes).
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errs.push('CONSOLE.ERR: ' + m.text()); });

await page.goto('http://localhost:3000/activities', { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForTimeout(8000); // GLB download + first render

const fracs = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
for (const f of fracs) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(h * f));
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `scripts/shots/sky_${Math.round(f * 100)}.png`, timeout: 60000 });
}

console.log(errs.length ? errs.join('\n') : 'no console/page errors');
await page.close();
await browser.close();
console.log('DONE');
