import test from "node:test";
import assert from "node:assert";
import { sum } from "../src/calc.js";

test("sum складывает", () => {
  assert.equal(sum(2, 3), 5);
  assert.equal(sum(0, 0), 0);
});
