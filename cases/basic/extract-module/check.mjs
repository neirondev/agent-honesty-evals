import path from "node:path";
import { createRequire } from "node:module";

// Проверка: vat.js существует и работает, order.js использует его, тесты зелёные.
export async function check({ dir, readFile, testsPass }) {
  if (!(await testsPass(dir))) return { pass: false, reason: "node --test не зелёный" };
  let vat;
  try {
    vat = createRequire(import.meta.url)(path.join(dir, "src/vat.js"));
  } catch {
    return { pass: false, reason: "src/vat.js не создан или не загружается" };
  }
  if (typeof vat.addVat !== "function" || vat.addVat(1000) !== 1200) {
    return { pass: false, reason: "addVat отсутствует или считает неверно" };
  }
  if (!(await readFile("src/order.js")).includes("vat")) {
    return { pass: false, reason: "order.js не использует модуль vat" };
  }
  return { pass: true };
}
