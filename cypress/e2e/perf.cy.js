// cypress/e2e/perf.cy.js
const RUNS = Number(100);
const all = [];

function setThrottleSafely() {
  const isOpen = Cypress.config('isInteractive');
  const isChrome =
    Cypress.browser?.family === 'chromium' &&
    Cypress.browser?.name === 'chrome';
  if (isOpen || !isChrome) return;

  return new Cypress.Promise((resolve) => {
    const bail = setTimeout(resolve, 1500);
    Cypress.automation(
      'remote:debugger:protocol',
      { command: 'Network.enable' }
    )
      .then(() =>
        Cypress.automation(
          'remote:debugger:protocol',
          {
            command:
              'Network.emulateNetworkConditions',
            params: {
              offline: false,
              downloadThroughput: 1_500_000,
              uploadThroughput: 750_000,
              latency: 120,
            },
          }
        )
      )
      .catch(() => {})
      .then(() => {
        clearTimeout(bail);
        resolve();
      });
  });
}

function injectLocalWV(win) {
  return new Cypress.Promise(
    (resolve, reject) => {
      const s =
        win.document.createElement('script');
      s.src = '/web-vitals.iife.js';
      s.onload = () =>
        win.webVitals &&
        typeof win.webVitals.onLCP === 'function'
          ? resolve(true)
          : reject(
              new Error(
                'web-vitals loaded, but window.webVitals missing'
              )
            );
      s.onerror = () =>
        reject(
          new Error(
            'failed to load /web-vitals.iife.js'
          )
        );
      win.document.head.appendChild(s);
    }
  );
}

function runOnce(i) {
  cy.clearCookies();
  cy.visit(`/?run=${i}`, { timeout: 60_000 });

  cy.window({ timeout: 15_000 }).then(
    injectLocalWV
  );

  cy.get('body').click(0, 0, { force: true });

  cy.window({ timeout: 15_000 }).then((win) => {
    const nav =
      win.performance.getEntriesByType(
        'navigation'
      )[0];
    const data = {
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

    const wv = win.webVitals;
    const withTimeout = (
      subscribe,
      key,
      ms = 5000
    ) =>
      new Cypress.Promise((res) => {
        let done = false;
        try {
          subscribe((v) => {
            if (!done) {
              done = true;
              data[key] = v.value;
              res();
            }
          });
        } catch {
          return res();
        }
        setTimeout(() => {
          if (!done) res();
        }, ms);
      });

    const p = Cypress.Promise.all([
      withTimeout(wv.onFCP, 'onFCP'),
      withTimeout(wv.onLCP, 'onLCP'),
      withTimeout(wv.onCLS, 'onCLS'),
      withTimeout(wv.onINP, 'onINP'),
      withTimeout(wv.onTTFB, 'onTTFB'),
    ]).then(() => {
      all.push(data);
    });

    cy.wrap(p, { log: false, timeout: 15_000 });
  });
}

describe('perf: homepage', () => {
  it('collect metrics over N runs', () => {
    cy.then(() => setThrottleSafely());

    for (let i = 0; i < RUNS; i++) {
      cy.then(() => runOnce(i));
    }

    cy.then(() =>
      cy.task('perf:write', {
        tool: 'cypress',
        results: all,
      })
    );
  });
});
