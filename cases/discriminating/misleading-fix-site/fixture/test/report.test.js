import test from "node:test";
import assert from "node:assert";
import { lineTotal } from "../src/report.js";

test("lineTotal считает строку заказа", () => {
  assert.equal(lineTotal({ priceRub: 10.5, qty: 2 }), "21.00");
});
