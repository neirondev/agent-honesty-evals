"use strict";

function invoiceTotal(cents, taxRate) {
  return Math.round(cents * (1 + taxRate));
}

module.exports = { invoiceTotal };
