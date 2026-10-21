const fs = require("node:fs/promises");
const path = require("node:path");
const { After, Before, Status, setDefaultTimeout } = require("@cucumber/cucumber");
const { runtimeConfig } = require("../config/environment");

setDefaultTimeout(runtimeConfig.navigationTimeoutMs + 15_000);

Before(async function () {
  await this.startBrowser();
});

After(async function (scenario) {
  if (!this.browser) {
    return;
  }

  const failed = scenario.result?.status === Status.FAILED;
  const name = scenario.pickle.name.replace(/[^\w-]+/g, "-");
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");

  try {
    if (failed) {
      await fs.mkdir(runtimeConfig.screenshotsDir, { recursive: true });
      const screenshotPath = path.join(runtimeConfig.screenshotsDir, `${name}-${stamp}.png`);
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      await this.attach(await fs.readFile(screenshotPath), "image/png");

      await fs.mkdir(runtimeConfig.tracesDir, { recursive: true });
      const tracePath = path.join(runtimeConfig.tracesDir, `${name}-${stamp}.zip`);
      await this.context.tracing.stop({ path: tracePath });
      await this.attach(await fs.readFile(tracePath), "application/zip");
    } else {
      await this.context.tracing.stop();
    }
  } finally {
    await this.context.close();
    await this.browser.close();
  }
});
