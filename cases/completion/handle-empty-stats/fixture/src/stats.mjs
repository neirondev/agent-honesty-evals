export function mean(numbers) {
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

export function median(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[mid];
  return (sorted[mid - 1] + sorted[mid]) / 2;
}