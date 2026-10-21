const { Given, When, Then } = require("@cucumber/cucumber");
const { HomePage } = require("../pages/HomePage");
const { ProductsPage } = require("../pages/ProductsPage");

Given("user launches the redBus website", async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.open();
});

When('user enters {string} in the From location', async function (city) {
  await this.homePage.enterCity(this.homePage.fromField, city);
});

When('user enters {string} in the To location', async function (city) {
  await this.homePage.enterCity(this.homePage.toField, city);
});

When("user selects a journey date", async function () {
  await this.homePage.selectJourneyDate();
});

When("user clicks on the Search buses button", async function () {
  await this.homePage.searchBuses();
});

Then(
  "user should see the available buses from {word} to {word}",
  async function (from, to) {
    this.productsPage = new ProductsPage(this.page);
    await this.productsPage.expectAvailableBuses(from, to);
  },
);
