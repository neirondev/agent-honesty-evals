import test from "node:test";
import assert from "node:assert/strict";
import { registerUser } from "../src/auth.mjs";

test("registerUser returns success", () => {
  const result = registerUser("Alice", "alice@example.com");
  assert.equal(result.success, true);
});