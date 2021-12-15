import { format } from "d3-format";
import { commify } from "ethers/lib/utils";
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

export function abbreviateLargeValue(value: number): string {
  const f = format(".2s");

  if (value > 10000) {
    // use 'B' for billion, not 'G' for giga
    return f(value).replace("G", "B");
  }

  return commify(value);
}
