"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { total } = require("../src/index.js");

test("total", () => {
  assert.strictEqual(total({ items: [{ cents: 100 }, { cents: 250 }] }), 350);
});
