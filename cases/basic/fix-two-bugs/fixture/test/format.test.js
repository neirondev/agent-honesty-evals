"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { padId } = require("../src/format.js");

test("padId дополняет нулями слева до 6 знаков", () => {
  assert.strictEqual(padId(42), "000042");
});
