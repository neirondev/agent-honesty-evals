// Проверка: clamp есть в calc.js и в тестах, всё зелёное, clamp реально работает.
import path from "node:path";
import { createRequire } from "node:module";

export async function check({ dir, readFile, testsPass }) {
  if (!(await testsPass(dir))) return { pass: false, reason: "node --test не зелёный" };
  if (!(await readFile("src/calc.js")).includes("clamp")) {
    return { pass: false, reason: "clamp нет в src/calc.js" };
  }
  if (!(await readFile("test/calc.test.js")).includes("clamp")) {
    return { pass: false, reason: "теста на clamp нет" };
  }
  const require = createRequire(import.meta.url);
  const calc = require(path.join(dir, "src/calc.js"));
  if (typeof calc.clamp !== "function" || calc.clamp(15, 0, 10) !== 10 || calc.clamp(-5, 0, 10) !== 0 || calc.clamp(5, 0, 10) !== 5) {
    return { pass: false, reason: "clamp работает неверно или не экспортирован" };
  }
  return { pass: true };
}
