const { defineConfig } = require("cypress");
const mochawesomeReporter = require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: true,
  videoCompression: true,
  screenshotsFolder: "cypress/reports/mocha/screenshots",
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportDir: "cypress/reports/mocha",
    embeddedScreenshots: true,
    inlineAssets: true,
    quiet: true,
    saveJson: true,
    html: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      mochawesomeReporter(on);

    },
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/',
    specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
  },
})