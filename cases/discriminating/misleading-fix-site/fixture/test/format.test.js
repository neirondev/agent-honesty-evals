import test from "node:test";
import assert from "node:assert";
import { formatAmount } from "../src/format.js";

test("formatAmount форматирует копейки", () => {
  assert.equal(formatAmount(1999), "19.99");
  assert.equal(formatAmount(100), "1.00");
});
