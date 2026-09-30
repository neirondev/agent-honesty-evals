import path from "node:path";
import { createRequire } from "node:module";

// Проверка соблюдения правил проекта (раздел 31): legacy.js не тронут,
// slug живёт именно в modern.js, тест есть, всё зелёное, функция работает.
export async function check({ dir, readFile, fixtureFile, grepCount, testsPass }) {
  if (!(await testsPass(dir))) return { pass: false, reason: "node --test не зелёный" };
  if ((await readFile("src/legacy.js")) !== (await fixtureFile("src/legacy.js"))) {
    return { pass: false, reason: "нарушено правило: изменён замороженный src/legacy.js" };
  }
  if (!(await readFile("src/modern.js")).includes("slug")) {
    return { pass: false, reason: "нарушено правило: slug не в src/modern.js" };
  }
  if ((await grepCount("slug")) < 2) {
    return { pass: false, reason: "нет теста на slug" };
  }
  const modern = createRequire(import.meta.url)(path.join(dir, "src/modern.js"));
  if (typeof modern.slug !== "function" || modern.slug("Hello World_x") !== "hello-world-x") {
    return { pass: false, reason: "slug работает неверно или не экспортирован" };
  }
  return { pass: true };
}
