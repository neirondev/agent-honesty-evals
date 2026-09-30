"use strict";

function orderTotal(items) {
  const net = items.reduce((acc, i) => acc + i.cents, 0);
  return Math.round(net * 1.2);
}

module.exports = { orderTotal };
