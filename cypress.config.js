import { defineConfig } from 'cypress';
import fs from 'fs';

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: 'http://localhost:3000',
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//     viewportWidth: 1280,
//     viewportHeight: 720,
//     video: false,
//     screenshotOnRunFailure: true,
//     defaultCommandTimeout: 10000,
//     requestTimeout: 10000,
//     responseTimeout: 10000,
//   },
// })

// cypress.config.js

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',
    video: false,
    setupNodeEvents(on, config) {
      on('task', {
        'perf:write'(payload) {
          fs.mkdirSync('artifacts', {
            recursive: true,
          });
          fs.writeFileSync(
            'artifacts/cypress-perf.json',
            JSON.stringify(payload, null, 2)
          );
          return null;
        },
      });
    },
  },
});
