const path = require("node:path");
const routeData = require("../test-data/routes.json");

function readBoolean(name, fallback) {
  const value = process.env[name];
  if (value === undefined || value === "") {
    return fallback;
  }

  if (value.toLowerCase() === "true") {
    return true;
  }
  if (value.toLowerCase() === "false") {
    return false;
  }

  throw new Error(`${name} must be "true" or "false".`);
}

function readPositiveInteger(name, fallback) {
  const value = process.env[name];
  if (value === undefined || value === "") {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }

  return parsed;
}

function readRequiredValue(name, fallback) {
  const value = process.env[name]?.trim() || fallback;
  if (!value) {
    throw new Error(`${name} must not be empty.`);
  }
  return value;
}

function readJourneyDay(value) {
  const day = value.toLowerCase();
  if (day !== "today" && day !== "tomorrow") {
    throw new Error('JOURNEY_DAY must be either "today" or "tomorrow".');
  }
  return day;
}

const baseURL = readRequiredValue("BASE_URL", "https://www.redbus.in").replace(/\/+$/, "");
if (!["http:", "https:"].includes(new URL(baseURL).protocol)) {
  throw new Error("BASE_URL must use HTTP or HTTPS.");
}

const runtimeConfig = Object.freeze({
  baseURL,
  headless: readBoolean("HEADLESS", false),
  ci: Boolean(process.env.CI),
  navigationTimeoutMs: readPositiveInteger("NAVIGATION_TIMEOUT_MS", 30_000),
  expectTimeoutMs: readPositiveInteger("EXPECT_TIMEOUT_MS", 10_000),
  timezone: "Asia/Kolkata",
  allureResultsDir: path.resolve(
    process.env.ALLURE_RESULTS_DIR || "reports/allure-results",
  ),
  screenshotsDir: path.resolve(process.env.SCREENSHOTS_DIR || "screenshots"),
  tracesDir: path.resolve(process.env.TRACES_DIR || "traces"),
  videosDir: path.resolve(process.env.VIDEOS_DIR || "videos"),
  route: Object.freeze({
    from: readRequiredValue("RED_BUS_FROM", routeData.searchRoute.from),
    to: readRequiredValue("RED_BUS_TO", routeData.searchRoute.to),
    journeyDay: readJourneyDay(
      readRequiredValue("JOURNEY_DAY", routeData.searchRoute.journeyDay),
    ),
  }),
});

module.exports = { runtimeConfig };
