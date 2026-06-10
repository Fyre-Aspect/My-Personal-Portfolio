import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push('PAGEERROR: ' + (e.stack || e.message)));

await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 120000 });
await page.waitForTimeout(12000);

// Pull any Next.js dev error-overlay text
const overlay = await page.evaluate(() => {
  const portal = document.querySelector('nextjs-portal');
  if (!portal || !portal.shadowRoot) return null;
  return portal.shadowRoot.textContent?.slice(0, 1500);
});

console.log('=== CONSOLE / PAGE ERRORS (filtered) ===');
for (const l of logs) {
  if (/error|throw|cannot|undefined|null|three|gl|webgl|invalid|fail/i.test(l) && !/hydrated but some attributes/.test(l)) {
    console.log(l.slice(0, 400));
  }
}
console.log('=== NEXT OVERLAY ===');
console.log(overlay || 'no overlay');
await browser.close();
