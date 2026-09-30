"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { orderTotal } = require("../src/order.js");

test("orderTotal с НДС 20%", () => {
  assert.strictEqual(orderTotal([{ cents: 1000 }]), 1200);
  assert.strictEqual(orderTotal([{ cents: 500 }, { cents: 500 }]), 1200);
});
