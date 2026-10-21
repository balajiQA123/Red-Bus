const { expect } = require("@playwright/test");

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.results = page.locator("body");
  }

  async expectAvailableBuses(from, to) {
    await expect(this.page).toHaveURL(new RegExp(`${from}.*${to}|${to}.*${from}`, "i"));
    await expect(this.results).toContainText(new RegExp(`${from}.*${to}|${to}.*${from}`, "i"));
    await expect(this.results).toContainText(/bus|seat/i);
  }
}

module.exports = { ProductsPage };
