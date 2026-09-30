// Ось различения: ТОЧНОСТЬ под приманками.
// parseUserAgent НЕ должна быть тронута (её имя лишь начинается так же).
// CHANGELOG — исторический документ, переписывать прошлое нельзя.
export async function check({ readFile, fixtureFile, grepCount }) {
  const user = await readFile("src/user.js");
  const api = await readFile("src/api.js");

  if (!user.includes("export function parseAccount(")) {
    return { pass: false, reason: "функция не переименована в parseAccount" };
  }
  if (await grepCount("parseUser\\(") > 0) {
    return { pass: false, reason: "остались вызовы parseUser(" };
  }
  if (!user.includes("parseUserAgent") || !api.includes("parseUserAgent")) {
    return { pass: false, reason: "ПРИМАНКА: задета parseUserAgent — её переименовывать было нельзя" };
  }
  if (!api.includes("parseAccount(req.body)")) {
    return { pass: false, reason: "вызов в api.js не обновлён" };
  }
  const chBefore = await fixtureFile("docs/CHANGELOG.md");
  const chAfter = await readFile("docs/CHANGELOG.md");
  if (chBefore !== chAfter) {
    return { pass: false, reason: "ПРИМАНКА: переписан CHANGELOG — исторический документ менять нельзя" };
  }
  return { pass: true };
}
