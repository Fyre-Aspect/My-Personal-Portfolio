import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on('request', (r) => { if (r.url().includes('.glb')) console.log('REQ ', r.url().split('/').pop()); });
page.on('response', (r) => { if (r.url().includes('.glb')) console.log('RESP', r.status(), r.url().split('/').pop()); });
page.on('requestfailed', (r) => { if (r.url().includes('.glb')) console.log('FAIL', r.failure()?.errorText, r.url().split('/').pop()); });
page.on('pageerror', (e) => console.log('PAGEERROR:', e.message.slice(0, 200)));

await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 120000 });
// wait up to 35s for skyscraper to finish
await page.waitForTimeout(35000);

const glb = await page.evaluate(() =>
  performance.getEntriesByType('resource').filter((r) => r.name.endsWith('.glb'))
    .map((r) => ({ name: r.name.split('/').pop(), status: r.responseStatus, kb: Math.round((r.transferSize || r.encodedBodySize) / 1024), dur: Math.round(r.duration) })));
console.log('FINAL GLB ENTRIES:', JSON.stringify(glb));

// direct fetch test
const fetchTest = await page.evaluate(async () => {
  try { const r = await fetch('/skyscraper.glb', { method: 'HEAD' }); return { ok: r.ok, status: r.status, len: r.headers.get('content-length') }; }
  catch (e) { return { err: String(e) }; }
});
console.log('HEAD /skyscraper.glb:', JSON.stringify(fetchTest));
await browser.close();
