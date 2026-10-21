require("dotenv").config();

module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: ["support/**/*.js", "pages/**/*.js", "step-definitions/**/*.js"],
    format: ["progress", "allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "reports/allure-results",
    },
    publishQuiet: true,
    parallel: 1,
    retry: process.env.CI ? 1 : 0,
  },
};
