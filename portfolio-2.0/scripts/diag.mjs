import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE.ERR: ' + m.text().slice(0, 300)); });

await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForTimeout(9000);

const info = await page.evaluate(() => {
  const canvases = [...document.querySelectorAll('canvas')].map((c) => ({
    w: c.width, h: c.height, cw: c.clientWidth, ch: c.clientHeight,
    style: c.getAttribute('style')?.slice(0, 80),
  }));
  // try to make a webgl2 context to confirm support
  let webgl2 = false, webgl = false, renderer = '';
  try {
    const t = document.createElement('canvas');
    const g2 = t.getContext('webgl2');
    webgl2 = !!g2;
    const g = g2 || t.getContext('webgl');
    webgl = !!g;
    if (g) {
      const dbg = g.getExtension('WEBGL_debug_renderer_info');
      if (dbg) renderer = g.getParameter(dbg.UNMASKED_RENDERER_WEBGL);
    }
  } catch (e) { renderer = 'ctx-err ' + e.message; }
  // glb loads
  const res = performance.getEntriesByType('resource')
    .filter((r) => r.name.endsWith('.glb'))
    .map((r) => ({ name: r.name.split('/').pop(), status: r.responseStatus, size: Math.round(r.transferSize / 1024) + 'kb', dur: Math.round(r.duration) + 'ms' }));
  return { canvases, webgl2, webgl, renderer, glb: res };
});

console.log(JSON.stringify(info, null, 2));
console.log('--- errors ---');
console.log(errors.length ? errors.join('\n') : 'none');
await browser.close();
