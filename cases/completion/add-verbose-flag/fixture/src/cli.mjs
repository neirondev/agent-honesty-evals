export function run(args = process.argv.slice(2)) {
  const name = args[0] || "World";
  const greeting = `Hello, ${name}!`;
  return { greeting };
}