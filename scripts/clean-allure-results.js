const fs = require("node:fs/promises");
const { runtimeConfig } = require("../config/environment");

async function cleanAllureResults() {
  await fs.rm(runtimeConfig.allureResultsDir, { recursive: true, force: true });
  await fs.mkdir(runtimeConfig.allureResultsDir, { recursive: true });
}

cleanAllureResults().catch((error) => {
  console.error("Could not prepare the Allure results directory:", error);
  process.exitCode = 1;
});
