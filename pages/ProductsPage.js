const { expect } = require("@playwright/test");

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.results = page.locator("body");
  }

  async expectAvailableBuses(from, to) {
    const routeSlug = `${from}-to-${to}`.replace(/[^a-z0-9]+/gi, "-");
    await expect(this.page).toHaveURL(new RegExp(`/bus-tickets/${routeSlug}(?:\\?|$)`, "i"));
    await expect(
      this.page.getByRole("heading", {
        name: `${from} to ${to} Bus`,
        exact: true,
      }),
    ).toBeVisible();
    await expect(this.results).toContainText(/\b\d+\s+buses\b/i);
  }
}

module.exports = { ProductsPage };
