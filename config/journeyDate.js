const { runtimeConfig } = require("./environment");

function getJourneyDayOfMonth(journeyDay) {
  const dateParts = new Intl.DateTimeFormat("en", {
    timeZone: runtimeConfig.timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
    .formatToParts(new Date())
    .reduce((parts, part) => {
      parts[part.type] = part.value;
      return parts;
    }, {});

  const dayOffset = journeyDay.toLowerCase() === "tomorrow" ? 1 : 0;
  const date = new Date(
    Date.UTC(
      Number(dateParts.year),
      Number(dateParts.month) - 1,
      Number(dateParts.day) + dayOffset,
    ),
  );

  return date.getUTCDate();
}

module.exports = { getJourneyDayOfMonth };
