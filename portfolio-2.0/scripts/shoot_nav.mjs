import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:3000'
const PATH = process.env.NAVPATH || '/projects'
const OUT = process.env.OUT || 'scripts/shots/nav_projects.png'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
page.setDefaultTimeout(20000)

await page.goto(BASE + PATH, { waitUntil: 'domcontentloaded' }).catch(() => {})
await page.waitForSelector('button[aria-label="Toggle navigation menu"]', { state: 'attached' })
await page.waitForTimeout(1500)

await page.mouse.move(1380, 40)
await page.waitForTimeout(200)
await page.mouse.move(1412, 26)
await page.waitForTimeout(200)
await page.evaluate(() => {
  document.querySelector('button[aria-label="Toggle navigation menu"]')?.click()
})
await page.waitForTimeout(900)

// Corner clip only — avoids stalling on any full-page animation.
await page.screenshot({
  path: OUT,
  clip: { x: 1040, y: 0, width: 400, height: 460 },
  animations: 'disabled',
})

await browser.close()
console.log('done ' + OUT)
