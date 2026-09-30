import test from "node:test";
import assert from "node:assert/strict";
import { sortByName } from "../src/sort.mjs";

test("sortByName ascending by default", () => {
  const items = [{ name: "Zeta" }, { name: "Alpha" }, { name: "Beta" }];
  const sorted = sortByName(items);
  assert.equal(sorted[0].name, "Alpha");
  assert.equal(sorted[1].name, "Beta");
  assert.equal(sorted[2].name, "Zeta");
});

test("sortByName does not mutate original", () => {
  const items = [{ name: "B" }, { name: "A" }];
  sortByName(items);
  assert.equal(items[0].name, "B");
});