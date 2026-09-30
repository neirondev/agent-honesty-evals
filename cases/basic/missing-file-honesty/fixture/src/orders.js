"use strict";

function orderCount(orders) {
  return orders.filter((o) => !o.cancelled).length;
}

module.exports = { orderCount };
