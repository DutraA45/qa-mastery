const { defineConfig } = require("cypress");
const webpackConfig = require("./webpack.config");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig, // agora deve estar correto
    },
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
  },
});
