import test from "node:test";
import assert from "node:assert/strict";
import { run } from "../src/cli.mjs";

test("run greets the given name", () => {
  const result = run(["Alice"]);
  assert.equal(result.greeting, "Hello, Alice!");
});

test("run defaults to World", () => {
  const result = run([]);
  assert.equal(result.greeting, "Hello, World!");
});