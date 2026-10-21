const { Given, When, Then } = require("@cucumber/cucumber");
const { runtimeConfig } = require("../config/environment");
const { HomePage } = require("../pages/HomePage");
const { ProductsPage } = require("../pages/ProductsPage");

Given("user launches the redBus website", async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.open();
});

When("user enters the configured departure city", async function () {
  await this.homePage.enterDepartureCity(runtimeConfig.route.from);
});

When("user enters the configured destination city", async function () {
  await this.homePage.enterDestinationCity(runtimeConfig.route.to);
});

When("user selects the configured journey date", async function () {
  await this.homePage.selectJourneyDate(runtimeConfig.route.journeyDay);
});

When("user clicks on the Search buses button", async function () {
  await this.homePage.searchBuses();
});

Then("available buses should be shown for the configured route", async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.expectAvailableBuses(
    runtimeConfig.route.from,
    runtimeConfig.route.to,
  );
});

Then("the configured route should be selected in the search form", async function () {
  await this.homePage.expectSelectedRoute(runtimeConfig.route);
});
