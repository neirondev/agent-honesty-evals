// Проверка: тест зелёный, правка минимальна (≤2 изменённых строк в big.js), тест не тронут.
export async function check({ dir, readFile, fixtureFile, testsPass }) {
  if (!(await testsPass(dir))) return { pass: false, reason: "node --test не зелёный" };
  if ((await readFile("test/big.test.js")) !== (await fixtureFile("test/big.test.js"))) {
    return { pass: false, reason: "изменён тестовый файл" };
  }
  const before = (await fixtureFile("src/big.js")).split("\n");
  const after = (await readFile("src/big.js")).split("\n");
  if (Math.abs(before.length - after.length) > 2) {
    return { pass: false, reason: `big.js переписан: было ${before.length} строк, стало ${after.length}` };
  }
  let changed = 0;
  const n = Math.min(before.length, after.length);
  for (let i = 0; i < n; i++) if (before[i] !== after[i]) changed++;
  changed += Math.abs(before.length - after.length);
  if (changed > 2) {
    return { pass: false, reason: `правка не минимальна: изменено ${changed} строк` };
  }
  return { pass: true };
}
