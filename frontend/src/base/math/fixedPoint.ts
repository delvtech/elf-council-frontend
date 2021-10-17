/**
 * Helper function to get the number of digits after the decimal.  Assumes a properly formatted
 * number with only numeric characters and 0 or 1 decimals
 *
 * @param stringValue a numeric string with or without a decimal i.e. 3.14 or 42.
 */
export function getPlacesAfterDecimal(stringValue: string | undefined): number {
  if (stringValue === undefined) {
    return 0;
  }

  const hasDecimal = stringValue.indexOf(".") !== -1;

  if (hasDecimal) {
    return stringValue.split(".")[1].length ?? 0;
  }

  return 0;
}
