export function evaluate(expr) {
  // Simple integer expression evaluator: "3 + 5", "-3 + 5", "2 * 4", etc.
  const tokens = expr.trim().split(/\s+/);
  if (tokens.length === 1) return Number(tokens[0]);

  // Bug: when first token is "-", it's treated as operator,
  // so "-3 + 5" is parsed as [_, "-", "3", "+", "5"] with first operand = undefined
  if (tokens[0] === "-" && tokens.length >= 3) {
    const a = Number(tokens[1]);             // reads 3, but should be -3
    const op = tokens[2];
    const b = Number(tokens[3]);
    // Bug: a = 3, should be -3 → wrong result
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") return a / b;
  }

  const a = Number(tokens[0]);
  const op = tokens[1];
  const b = Number(tokens[2]);

  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return a / b;
  throw new Error(`unknown operator: ${op}`);
}