const { World, setWorldConstructor } = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");
const { runtimeConfig } = require("../config/environment");

expect.configure({ timeout: runtimeConfig.expectTimeoutMs });

class RedBusWorld extends World {
  async startBrowser() {
    this.browser = await chromium.launch({ headless: runtimeConfig.headless });
    this.context = await this.browser.newContext({
      locale: "en-IN",
      timezoneId: runtimeConfig.timezone,
      recordVideo: { dir: runtimeConfig.videosDir },
      viewport: { width: 1440, height: 1000 },
    });
    this.page = await this.context.newPage();
    await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  }
}

setWorldConstructor(RedBusWorld);
