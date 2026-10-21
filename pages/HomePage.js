const { expect } = require("@playwright/test");
const { runtimeConfig } = require("../config/environment");
const { getJourneyDayOfMonth } = require("../config/journeyDate");

class HomePage {
  constructor(page) {
    this.page = page;
    this.fromField = page.getByRole("combobox", { name: "From" });
    this.toField = page.getByRole("combobox", { name: "To" });
    this.dateSelector = page.getByRole("dialog", { name: /select date of journey/i }).first();
    this.searchButton = page.getByRole("button", { name: "Search buses" });
  }

  async open() {
    await this.page.goto(runtimeConfig.baseURL, {
      waitUntil: "domcontentloaded",
      timeout: runtimeConfig.navigationTimeoutMs,
    });
    await expect(this.fromField).toBeVisible();
    await expect(this.toField).toBeVisible();
  }

  async enterDepartureCity(city) {
    await this.enterCity(this.fromField, city);
  }

  async enterDestinationCity(city) {
    await this.enterCity(this.toField, city);
  }

  async enterCity(field, city) {
    const suggestionsLoaded = this.page.waitForResponse((response) => {
      const url = new URL(response.url());
      return (
        url.pathname.endsWith("/rpw/api/citySuggestion") &&
        url.searchParams.get("search")?.trim().toLowerCase() === city.toLowerCase()
      );
    });
    await field.fill(city);
    const suggestionResponse = await suggestionsLoaded;
    if (!suggestionResponse.ok()) {
      throw new Error(`Could not load location suggestions for "${city}".`);
    }

    const suggestions = this.page.getByRole("dialog", { name: /search suggestions/i });
    const cityOption = suggestions
      .getByRole("button", { name: new RegExp(`^${escapeRegExp(city)},\\s*,\\s*$`, "i") })
      .first();
    await expect(cityOption).toBeVisible();
    await cityOption.click();
    await expect(field).toHaveValue(city);
  }

  async selectJourneyDate(journeyDay) {
    const quickDateButton = this.page.getByRole("button", {
      name: new RegExp(`^Search for ${escapeRegExp(journeyDay)}$`, "i"),
    });

    if (await quickDateButton.isVisible()) {
      await quickDateButton.click();
      return;
    }

    await this.dateSelector.click();
    const calendar = this.page.getByRole("dialog", { name: /select date of journey/i }).last();
    const dayOfMonth = getJourneyDayOfMonth(journeyDay);
    await calendar.getByText(String(dayOfMonth), { exact: true }).click();
    await expect(this.dateSelector).toContainText(
      journeyDay.toLowerCase() === "tomorrow" ? /tmrw|tomorrow/i : /today/i,
    );
  }

  async searchBuses() {
    await this.searchButton.click();
  }

  async expectSelectedRoute(route) {
    await expect(this.fromField).toHaveValue(route.from);
    await expect(this.toField).toHaveValue(route.to);
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = { HomePage };
