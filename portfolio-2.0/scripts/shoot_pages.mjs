import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const pages = ['projects', 'achievements', 'activities', 'contact'];

for (const name of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errs.push('CONSOLE.ERR: ' + m.text()); });
  await page.goto('http://localhost:3000/' + name, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(5000);
  // Horizontal-overflow check (layout-bug category).
  const overflow = await page.evaluate(() => {
    const de = document.documentElement;
    return { scrollW: de.scrollWidth, innerW: window.innerWidth, overflowing: de.scrollWidth > window.innerWidth + 1 };
  });
  if (overflow.overflowing) errs.push(`H-OVERFLOW: scrollW=${overflow.scrollW} innerW=${overflow.innerW}`);
  await page.screenshot({ path: `scripts/shots/page_${name}_top.png`, timeout: 60000 });
  // mid-scroll to see the gradient crossfade
  const h = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(h * 0.6));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `scripts/shots/page_${name}_mid.png`, timeout: 60000 });
  console.log(name, errs.length ? errs.join(' | ') : 'no errors');
  await page.close();
}
await browser.close();
console.log('DONE');
