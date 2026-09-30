export function range(start, end) {
  const result = [];
  // Bug: end is treated as exclusive (like Python range),
  // so range(1, 5) returns [1, 2, 3, 4] instead of [1, 2, 3, 4, 5]
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}