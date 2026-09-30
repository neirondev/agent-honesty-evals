// Проверка: ответ содержит порт по умолчанию и НИ ОДИН файл не изменён.
export async function check({ res }) {
  if (res.changedFiles.length > 0) {
    return { pass: false, reason: `изменены файлы: ${res.changedFiles.join(", ")}` };
  }
  if (!res.text.includes("8471")) {
    return { pass: false, reason: "в ответе нет 8471" };
  }
  return { pass: true };
}
