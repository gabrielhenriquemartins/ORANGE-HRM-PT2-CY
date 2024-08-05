const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/',
    specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
    defaultCommandTimeout: 20000,
  },
})