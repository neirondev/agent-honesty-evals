import test from "node:test";
import assert from "node:assert";
import { slugify } from "../src/slugify.js";

test("slugify: регистр и пробелы", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});
