const {defineConfig} = require("cypress");

module.exports = defineConfig({
  projectId: "next-react-state-management",
  component: {
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    chromeWebSecurity: false,
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:3000/",
    supportFile: false,
  },
});
