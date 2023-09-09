const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: 0,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000'
  },
});
