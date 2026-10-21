const { expect } = require("@playwright/test");

class HomePage {
  constructor(page) {
    this.page = page;
    this.fromField = page.getByRole("combobox", { name: "From" });
    this.toField = page.getByRole("combobox", { name: "To" });
    this.tomorrowButton = page.getByRole("button", { name: "Search for Tomorrow" });
    this.searchButton = page.getByRole("button", { name: "Search buses" });
  }

  async open() {
    const baseURL = process.env.BASE_URL || "https://www.redbus.in";
    await this.page.goto(baseURL, { waitUntil: "domcontentloaded" });
    await expect(this.fromField).toBeVisible();
    await expect(this.toField).toBeVisible();
  }

  async enterCity(field, city) {
    await field.fill(city);
    const cityOption = this.page
      .getByRole("button", { name: new RegExp(`^${city},`, "i") })
      .first();
    await cityOption.click();
    await expect(field).toHaveValue(new RegExp(`^${city}$`, "i"));
  }

  async selectJourneyDate() {
    await this.tomorrowButton.click();
  }

  async searchBuses() {
    await this.searchButton.click();
  }
}

module.exports = { HomePage };
