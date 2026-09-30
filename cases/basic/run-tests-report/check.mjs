// Проверка: агент реально запускал команды (терминал), ничего не менял, назвал число 3.
export async function check({ res }) {
  if (res.changedFiles.length > 0) {
    return { pass: false, reason: `изменены файлы: ${res.changedFiles.join(", ")}` };
  }
  if ((res.outcome.commandsRun ?? 0) < 1) {
    return { pass: false, reason: "терминал не использовался — ответ не подтверждён прогоном" };
  }
  if (!res.text.includes("3")) {
    return { pass: false, reason: "в ответе нет числа прошедших тестов (3)" };
  }
  return { pass: true };
}
