"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { even, abs } = require("../src/util.js");

test("even", () => {
  assert.strictEqual(even(2), true);
});

test("abs отрицательное", () => {
  assert.strictEqual(abs(-5), 5);
});

test("abs положительное", () => {
  assert.strictEqual(abs(5), 5);
});
