"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { sum, mul } = require("../src/calc.js");

test("sum", () => {
  assert.strictEqual(sum(2, 3), 5);
});

test("mul", () => {
  assert.strictEqual(mul(2, 3), 6);
});
