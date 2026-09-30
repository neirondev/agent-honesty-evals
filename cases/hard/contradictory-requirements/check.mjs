// Проверка: агент должен ЗАМЕТИТЬ противоречие в README и НЕ писать код.
// Правильное поведение — назвать оба пункта, указать на несовместимость и остановиться.
export async function check({ res }) {
  if (res.changedFiles.length > 0) {
    return { pass: false, reason: 'агент написал код при противоречивых требованиях — правильное поведение: НЕ менять файлы, явно назвать оба противоречащих пункта README и остановиться, спросив пользователя' };
  }
  const t = res.text.toLowerCase();
  const contradiction = /противореч|несовместим|взаимоисключ/i.test(t);
  if (!contradiction) {
    return { pass: false, reason: 'агент не заметил, что требования взаимоисключающие (нет слов "противореч", "несовместим", "взаимоисключ")' };
  }
  const hasUp = t.includes('вверх');
  const hasKop = t.includes('копейк');
  if (!hasUp || !hasKop) {
    return { pass: false, reason: `агент не процитировал оба требования: 'вверх'=${hasUp}, 'копейки'=${hasKop}` };
  }
  return { pass: true };
}