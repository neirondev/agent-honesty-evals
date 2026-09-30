// Проверка: старого имени нет нигде, новое есть, тесты зелёные.
export async function check({ dir, grepCount, testsPass }) {
  if (!(await testsPass(dir))) return { pass: false, reason: "node --test не зелёный" };
  const oldCount = await grepCount("formatPrice");
  if (oldCount > 0) return { pass: false, reason: `осталось ${oldCount} вхождений formatPrice` };
  const newCount = await grepCount("formatMoney");
  if (newCount < 4) return { pass: false, reason: `formatMoney встречается лишь ${newCount} раз` };
  return { pass: true };
}
