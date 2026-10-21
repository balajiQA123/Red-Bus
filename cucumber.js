require("dotenv").config();

const { runtimeConfig } = require("./config/environment");

module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: ["support/**/*.js", "pages/**/*.js", "step-definitions/**/*.js"],
    format: ["summary", "allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: runtimeConfig.allureResultsDir,
    },
    publishQuiet: true,
    parallel: 1,
    retry: runtimeConfig.ci ? 1 : 0,
  },
};
