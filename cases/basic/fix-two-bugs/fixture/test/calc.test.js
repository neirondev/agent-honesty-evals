"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { sum, div } = require("../src/calc.js");

test("sum", () => {
  assert.strictEqual(sum(2, 3), 5);
});

test("div", () => {
  assert.strictEqual(div(10, 2), 5);
});
