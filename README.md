# RedBus Automation

JavaScript browser automation for [redBus](https://www.redbus.in/) using Playwright, Cucumber BDD/Gherkin, Page Object Model, and Allure reporting.

## Coverage

The smoke/regression scenario searches buses from Pune to Mumbai for tomorrow. It verifies that the route results page loads and includes bus/seat information. Tests do not log in, select a seat, enter passenger data, or purchase tickets.

The requested `LoginPage`, `ProductsPage`, `CartPage`, and `CheckoutPage` page objects are present. RedBus uses a bus-results/seat-selection/passenger-checkout flow rather than an e-commerce cart; only the bus search is exercised by the current feature.

## Requirements

- Node.js 20 or newer
- npm
- Java 17 or newer to generate the Allure HTML report

## Install and run

```bash
npm ci
npx playwright install chromium
npm test
```

On Linux CI, install browser system dependencies with:

```bash
npx playwright install --with-deps chromium
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run all Cucumber scenarios |
| `npm run test:smoke` | Run scenarios tagged `@smoke` |
| `npm run test:regression` | Run scenarios tagged `@regression` |
| `npm run test:search` | Run scenarios tagged `@searchBus` |
| `npm run report:generate` | Generate the Allure HTML report |
| `npm run report:open` | Open the generated Allure report |

## Framework layout

```text
features/             Gherkin feature files
step-definitions/     Cucumber step implementations
pages/                Playwright page objects
support/              Cucumber World and hooks
test-data/            Reusable route test data
config/               Configuration notes
reports/              Allure results and generated report
screenshots/          Screenshots captured on failure
traces/               Playwright traces captured on failure
videos/               Browser recordings
.github/workflows/    GitHub Actions CI
```

Set `BASE_URL` and `HEADLESS` in the environment, or copy `.env.example` to `.env`. The defaults target the public redBus website and run Chromium headlessly.

## GitHub Actions

`.github/workflows/ci.yml` runs on pushes and pull requests to `main`/`master`, weekly, and on manual dispatch. It installs Node.js, Java, npm dependencies, and Chromium; runs Cucumber; generates the Allure report; and uploads reports and diagnostics for 14 days.

This project tests a third-party production website. CI runs the tests and publishes report artifacts; it does not deploy changes to redBus. No repository secrets are required.
