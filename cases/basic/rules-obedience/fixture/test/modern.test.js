"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { titleCase } = require("../src/modern.js");

test("titleCase", () => {
  assert.strictEqual(titleCase("hello world"), "Hello World");
});
