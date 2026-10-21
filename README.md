# RedBus Automation

Reusable JavaScript browser tests for [redBus](https://www.redbus.in/) using Playwright, Cucumber, Gherkin, the Page Object Model, and Allure.

## Requirements

- Node.js 20 or newer and npm
- Java 17 or newer to generate the Allure HTML report
- A desktop session for headed local browser runs, or set `HEADLESS=true`

## Install and run

```bash
npm ci
npx playwright install chromium
npm test
```

The default local run uses headed Chromium because the redBus site may reject headless browser navigation. On Linux without a display, run `HEADLESS=true npm test`. CI should use `xvfb-run -a npm test` with `HEADLESS=false`.

## Test commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run the complete Cucumber suite |
| `npm run test:playwright` | Run Playwright specs in `tests/` |
| `npm run test:bdd` | Run the complete BDD suite |
| `npm run test:smoke` | Run scenarios tagged `@smoke` |
| `npm run test:regression` | Run scenarios tagged `@regression` |
| `npm run test:report` | Generate the Allure HTML report |
| `npm run allure:generate` | Generate `reports/allure-report` from `reports/allure-results` |
| `npm run allure:open` | Open the generated Allure report |

Cucumber prints a scenario summary and writes Allure result files for each run. The `test:report` and `allure:generate` commands require Java. `allure:open` starts a local report server and remains running until stopped.

## Reusable test data and configuration

The default route and relative journey date are stored once in `test-data/routes.json`. The Gherkin steps and page objects read that shared data rather than repeating route values. Override the route without editing the feature:

```text
RED_BUS_FROM=Pune
RED_BUS_TO=Mumbai
JOURNEY_DAY=tomorrow
```

Copy `.env.example` to `.env` to configure local runs. Supported settings:

| Variable | Default | Purpose |
| --- | --- | --- |
| `BASE_URL` | `https://www.redbus.in` | Website under test |
| `HEADLESS` | `false` | Run Chromium without a visible window |
| `RED_BUS_FROM`, `RED_BUS_TO` | Values in `test-data/routes.json` | Departure and destination cities |
| `JOURNEY_DAY` | `tomorrow` | `today` or `tomorrow` |
| `NAVIGATION_TIMEOUT_MS` | `30000` | Page navigation and Cucumber step timeout |
| `EXPECT_TIMEOUT_MS` | `10000` | Playwright assertion timeout |
| `ALLURE_RESULTS_DIR` | `reports/allure-results` | Allure result output directory |
| `SCREENSHOTS_DIR`, `TRACES_DIR`, `VIDEOS_DIR` | `screenshots`, `traces`, `videos` | Browser diagnostic output directories |

No passwords, tokens, or other credentials are needed for these public search checks.

## Scenarios and tags

- `@smoke @searchBus`: searches for buses on the configured route and journey date.
- `@regression @routeForm`: selects the configured cities and checks that the form retains them.

The feature is tagged `@regression`, so the regression command runs both scenarios; smoke runs the end-to-end search scenario.

## Reports and diagnostics

- Cucumber: terminal scenario summary.
- Allure raw results: `reports/allure-results/`.
- Allure HTML report: `reports/allure-report/`.
- Failure screenshots, Playwright traces, and recordings: `screenshots/`, `traces/`, and `videos/`.

The raw and generated report folders and browser diagnostics are excluded from Git. Failure screenshots and traces are also attached to the Cucumber/Allure scenario.

## Framework layout

```text
features/             Gherkin feature files
tests/                Playwright spec files
step-definitions/     Cucumber step implementations
pages/                Playwright page objects
support/              Cucumber World, hooks, and browser lifecycle
test-data/            Reusable route data
config/               Environment and journey-date configuration
reports/              Allure results and generated HTML report
screenshots/          Failure screenshots
traces/               Failure Playwright traces
videos/               Browser recordings
.github/workflows/    GitHub Actions CI
```

The automation searches public bus information only. It does not log in, select seats, enter passenger details, or purchase tickets.
