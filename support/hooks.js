const fs = require("node:fs/promises");
const path = require("node:path");
const { After, Before, Status, setDefaultTimeout } = require("@cucumber/cucumber");

setDefaultTimeout(45_000);

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

  if (failed) {
    await fs.mkdir("screenshots", { recursive: true });
    const screenshotPath = path.join("screenshots", `${name}-${stamp}.png`);
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    await this.attach(await fs.readFile(screenshotPath), "image/png");

    await fs.mkdir("traces", { recursive: true });
    const tracePath = path.join("traces", `${name}-${stamp}.zip`);
    await this.context.tracing.stop({ path: tracePath });
    await this.attach(await fs.readFile(tracePath), "application/zip");
  } else {
    await this.context.tracing.stop();
  }

  await this.context.close();
  await this.browser.close();
});
