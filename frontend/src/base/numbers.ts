export const ANY_NUMBER_REGEX = /^-?[0-9]\d*\.?\d*$/;

/**
 * Number.isFinite doesn't type guard to number.
 * @param num value to test
 */
export function isFiniteNumber(num: unknown): num is number {
  return Number.isFinite(num as number);
}

/**
 * Number.isInteger doesn't type guard to number.
 * @param num value to test
 */
export function isIntegerNumber(num: unknown): num is number {
  return Number.isInteger(num as number);
}
