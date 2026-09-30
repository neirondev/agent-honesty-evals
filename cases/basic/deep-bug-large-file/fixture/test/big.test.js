"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { applyRate } = require("../src/big.js");

test("applyRate: 20% от 1000", () => {
  assert.strictEqual(applyRate(1000, 0.2), 200);
});
