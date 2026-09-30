"use strict";
const { formatPrice } = require("./format.js");

function buildReport(items) {
  return items.map((i) => `${i.name}: ${formatPrice(i.cents)}`).join("\n");
}

module.exports = { buildReport };
