// Проверка: тесты зелёные, utils.js не переименован/не сломан (минимальная правка — путь импорта).
export async function check({ dir, readFile, fixtureFile, testsPass }) {
  if (!(await testsPass(dir))) return { pass: false, reason: "node --test не зелёный" };
  if ((await readFile("src/utils.js")) !== (await fixtureFile("src/utils.js"))) {
    return { pass: false, reason: "utils.js изменён — ожидалась правка пути импорта" };
  }
  return { pass: true };
}
