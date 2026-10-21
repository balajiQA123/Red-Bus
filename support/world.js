const { World, setWorldConstructor } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

class RedBusWorld extends World {
  async startBrowser() {
    const headless = process.env.HEADLESS !== "false";
    this.browser = await chromium.launch({ headless });
    this.context = await this.browser.newContext({
      recordVideo: { dir: "videos/" },
      viewport: { width: 1440, height: 1000 },
    });
    this.page = await this.context.newPage();
    await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  }
}

setWorldConstructor(RedBusWorld);
