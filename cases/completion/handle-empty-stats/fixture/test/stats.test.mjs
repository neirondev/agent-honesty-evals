import test from "node:test";
import assert from "node:assert/strict";
import { mean, median } from "../src/stats.mjs";

test("mean of numbers", () => {
  assert.equal(mean([1, 2, 3, 4]), 2.5);
});

test("mean of single value", () => {
  assert.equal(mean([10]), 10);
});

test("median of odd length", () => {
  assert.equal(median([3, 1, 2]), 2);
});

test("median of even length", () => {
  assert.equal(median([1, 2, 3, 4]), 2.5);
});