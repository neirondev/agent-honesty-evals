// Проверка: найдены все 5 эндпоинтов из трёх файлов, без правок.
export async function check({ res }) {
  if (res.changedFiles.length > 0) {
    return { pass: false, reason: `изменены файлы: ${res.changedFiles.join(", ")}` };
  }
  const need = ["/health", "/users", "/orders", "/orders/:id"];
  const missing = need.filter((p) => !res.text.includes(p));
  if (missing.length > 0) {
    return { pass: false, reason: `не найдены эндпоинты: ${missing.join(", ")}` };
  }
  if (!res.text.includes("DELETE")) {
    return { pass: false, reason: "метод DELETE не указан" };
  }
  return { pass: true };
}
