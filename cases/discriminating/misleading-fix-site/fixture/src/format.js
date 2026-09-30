// Форматирует сумму, заданную В КОПЕЙКАХ, в строку рублей.
// Контракт: на вход целое число копеек.
export function formatAmount(cents) {
  return (cents / 100).toFixed(2);
}
