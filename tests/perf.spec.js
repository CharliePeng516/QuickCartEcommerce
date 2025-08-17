// tests/perf.spec.js
const {
  test,
  expect,
} = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const RUNS = Number(100);

async function setThrottleSafely(
  page,
  {
    down = 1_500_000,
    up = 750_000,
    latency = 120,
  } = {}
) {
  try {
    const client = await page
      .context()
      .newCDPSession(page);
    await client.send('Network.enable');
    await client.send(
      'Network.emulateNetworkConditions',
      {
        offline: false,
        downloadThroughput: down,
        uploadThroughput: up,
        latency,
      }
    );
  } catch {
    console.warn(
      'Failed to set network throttling, continuing without it.'
    );
  }
}

async function injectLocalWV(page) {
  await page.addScriptTag({
    url: '/web-vitals.iife.js',
  });
  const ok = await page.evaluate(
    () =>
      !!(
        window.webVitals &&
        typeof window.webVitals.onLCP ===
          'function'
      )
  );
  if (!ok)
    throw new Error(
      'web-vitals loaded, but window.webVitals missing'
    );
}

test('perf: homepage', async ({
  page,
  browserName,
}) => {
  test.setTimeout(
    Math.max(60_000, RUNS * 15_000)
  );
  await page.route('**/favicon.ico', (route) =>
    route.fulfill({
      status: 204,
      contentType: 'image/x-icon',
      body: '',
    })
  );
  const outDir = 'artifacts';
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(
    outDir,
    'playwright-perf.json'
  );
  const results = [];

  await page.route('**/*', (r) =>
    r.continue({
      headers: {
        ...r.request().headers(),
        'Cache-Control': 'no-store',
      },
    })
  );

  if (browserName === 'chromium') {
    await setThrottleSafely(page);
  }

  for (let i = 0; i < RUNS; i++) {
    await page.context().clearCookies();

    await page.goto(`/?run=${i}`, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    await injectLocalWV(page);

    await page.mouse.move(10, 10);
    await page.mouse.click(10, 10);

    const data = await page.evaluate(async () => {
      const nav =
        performance.getEntriesByType(
          'navigation'
        )[0];
      const out = {
        dcl: nav
          ? nav.domContentLoadedEventEnd -
            nav.startTime
          : NaN,
        load: nav
          ? nav.loadEventEnd - nav.startTime
          : NaN,
        ttfb: nav
          ? nav.responseStart - nav.requestStart
          : NaN,
      };

      const wv = window.webVitals;
      const withTimeout = (
        subscribe,
        key,
        ms = 5000
      ) =>
        new Promise((resolve) => {
          let done = false;
          try {
            subscribe((v) => {
              if (!done) {
                done = true;
                out[key] = v.value;
                resolve();
              }
            });
          } catch {
            return resolve();
          }
          setTimeout(() => {
            if (!done) resolve();
          }, ms);
        });

      if (wv) {
        await Promise.all([
          withTimeout(wv.onFCP, 'onFCP'),
          withTimeout(wv.onLCP, 'onLCP'),
          withTimeout(wv.onCLS, 'onCLS'),
          withTimeout(wv.onINP, 'onINP'),
          withTimeout(wv.onTTFB, 'onTTFB'),
        ]);
      }
      return out;
    });

    results.push(data);
  }

  fs.writeFileSync(
    outFile,
    JSON.stringify(
      { tool: 'playwright', results },
      null,
      2
    )
  );
  console.log(
    'Playwright perf written:',
    outFile
  );
  expect(results.length).toBe(RUNS);
});
