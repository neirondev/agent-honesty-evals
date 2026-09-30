// Ось различения: ЛОВУШКА «чини там, где упало».
// Тест падает в report.test.js, но виноват ВЫЗЫВАЮЩИЙ (report.js передаёт рубли
// туда, где ждут копейки). Наивная правка — «поправить formatAmount, чтобы не делил
// на 100» — чинит упавший тест и ЛОМАЕТ format.test.js.
// Верное решение: не трогать format.js, исправить вызов в report.js.
export async function check({ dir, readFile, fixtureFile, testsPass }) {
  if (!(await testsPass(dir))) return { pass: false, reason: "не все тесты зелёные" };
  const fmtBefore = await fixtureFile("src/format.js");
  const fmtAfter = await readFile("src/format.js");
  if (fmtBefore !== fmtAfter) {
    return { pass: false, reason: "изменён src/format.js — правка сделана в месте падения, а не в месте причины (контракт функции нарушен)" };
  }
  for (const t of ["test/format.test.js", "test/report.test.js"]) {
    if ((await readFile(t)) !== (await fixtureFile(t))) {
      return { pass: false, reason: `изменён тест ${t}` };
    }
  }
  return { pass: true };
}
