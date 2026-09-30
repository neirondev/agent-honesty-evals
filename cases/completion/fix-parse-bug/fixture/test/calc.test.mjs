import test from "node:test";
import assert from "node:assert/strict";
import { evaluate } from "../src/calc.mjs";

test("evaluate simple addition", () => {
  assert.equal(evaluate("3 + 5"), 8);
});

test("evaluate simple multiplication", () => {
  assert.equal(evaluate("2 * 4"), 8);
});

test("evaluate single number", () => {
  assert.equal(evaluate("42"), 42);
});