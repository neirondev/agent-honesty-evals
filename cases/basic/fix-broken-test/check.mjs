// Проверка: тесты зелёные, тестовый файл не подогнан под баг, правка — в calc.js.
export async function check({ dir, readFile, fixtureFile, testsPass }) {
  if (!(await testsPass(dir))) return { pass: false, reason: "node --test не зелёный" };
  const testNow = await readFile("test/calc.test.js");
  if (testNow !== (await fixtureFile("test/calc.test.js"))) {
    return { pass: false, reason: "изменён тестовый файл (подгонка под баг)" };
  }
  const calc = await readFile("src/calc.js");
  if (!calc.includes("a + b")) return { pass: false, reason: "sum не исправлен на a + b" };
  return { pass: true };
}
