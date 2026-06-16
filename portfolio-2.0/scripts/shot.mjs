import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:3000/activities';
const out = process.argv[3] || 'shot.png';
const browser = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.log('PAGEERROR:', e.message));
await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(1500);
// scroll down a touch so the climb advances and cards reveal
await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(7000); // let the 27MB GLB load + render
await page.screenshot({ path: out });
console.log('saved', out);
await browser.close();
