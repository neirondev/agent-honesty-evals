import test from "node:test";
import assert from "node:assert/strict";
import { range } from "../src/range.mjs";

test("range starts at correct position", () => {
  const r = range(1, 5);
  assert.equal(r[0], 1);
});

test("range has ascending numbers", () => {
  const r = range(1, 5);
  for (let i = 1; i < r.length; i++) {
    assert.ok(r[i] > r[i - 1]);
  }
});

test("range handles equal start and end", () => {
  const r = range(3, 3);
  assert.equal(typeof r, "object");
  assert.equal(r.length >= 1, true);
});