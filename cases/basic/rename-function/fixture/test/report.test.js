"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { formatPrice } = require("../src/format.js");
const { buildReport } = require("../src/report.js");

test("formatPrice", () => {
  assert.strictEqual(formatPrice(1050), "10.50 ₽");
});

test("buildReport", () => {
  assert.strictEqual(buildReport([{ name: "Кабель", cents: 250 }]), "Кабель: 2.50 ₽");
});
