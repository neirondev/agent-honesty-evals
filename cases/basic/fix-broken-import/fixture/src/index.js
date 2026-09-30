"use strict";
const { sum } = require("./utls.js");

function total(order) {
  return sum(order.items.map((i) => i.cents));
}

module.exports = { total };
