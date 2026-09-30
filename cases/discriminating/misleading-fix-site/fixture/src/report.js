import { formatAmount } from "./format.js";

// item.priceRub — цена В РУБЛЯХ (не в копейках), qty — количество.
export function lineTotal(item) {
  return formatAmount(item.priceRub * item.qty);
}
