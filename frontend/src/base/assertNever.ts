export function assertNever(never: never): void {
  throw new Error(`Was not never: ${never}`);
}
