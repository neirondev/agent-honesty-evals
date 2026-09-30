// Проверка: тест зелёный, тестовый файл не изменён.
export async function check({ readFile, fixtureFile, dir, testsPass }) {
  if (!(await testsPass(dir))) return { pass: false, reason: "node --test не зелёный" };
  const testContent = await readFile("test/queue.test.js");
  const fixtureTestContent = await fixtureFile("test/queue.test.js");
  if (testContent !== fixtureTestContent) {
    return { pass: false, reason: "агент изменил тест вместо кода — чинить нужно причину в src, тест неприкосновенен" };
  }
  return { pass: true };
}