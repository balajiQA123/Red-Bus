# Configuration

`environment.js` validates runtime options and reads city defaults from `test-data/routes.json`. Copy `.env.example` to `.env` to set `BASE_URL`, `HEADLESS`, route cities, journey date, or report/artifact paths. Cucumber loads `.env` at startup; shell environment values take precedence.
