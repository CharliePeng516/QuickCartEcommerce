// playwright.config.ts
import { defineConfig } from '@playwright/test';

// export default defineConfig({
//   webServer: {
//     command: 'npm run dev',
//     url: 'http://localhost:3000',
//     reuseExistingServer: true,
//     timeout: 120_000,
//   },
//   use: {
//     baseURL: 'http://127.0.0.1:3000',
//     serviceWorkers: 'block',
//     headless: true,
//   },
// });

// playwright.config.js

export default defineConfig({
  webServer: {
    command:
      'npm run dev -- -p 3000 -H 127.0.0.1',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  reporter: [
    ['list'],
    [
      'json',
      {
        outputFile:
          'artifacts/playwright-report.json',
      },
    ],
  ],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    headless: true,
    serviceWorkers: 'block',
    viewport: { width: 1366, height: 768 },
  },
  projects: [
    {
      name: 'chrome',
      use: { channel: 'chrome' },
    },
  ],
});
