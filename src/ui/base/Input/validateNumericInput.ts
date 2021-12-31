import { getPlacesAfterDecimal } from "src/base/math/fixedPoint";
import {
  ANY_NUMBER_REGEX,
  isFiniteNumber,
  isIntegerNumber,
} from "src/base/numbers";

export interface NumericValueOptions {
  /**
   * If the user tries to enter a value lower than min, the change is ignored.
   */
  min?: number;

  /**
   * If the user tries to enter a value higher than the max, the change is ignored.
   */
  max?: number;

  /**
   * Integer value for the number of digits allowed after the decimal.  If the user tries to enter
   * more digits than precision, the change is ignored.
   */
  maxPrecision?: number;
}

export const DEFAULT_NUMERIC_INPUT_OPTIONS: NumericValueOptions = {
  /**
   * Default to 0, as numeric inputs will rarely if ever accept negative inputs
   * from the user
   */
  min: 0,

  /**
   *  no one needs to put in more than a trillion anything
   *  */
  max: 999_999_999_999,
};

/**
 *
 * @param newStringValue the numeric value to validate
 * @param options NumericValueOptions
 * @returns a valid numeric string
 */
export function validateNumericInput(
  currentStringValue: string,
  newStringValue: string,
  options = DEFAULT_NUMERIC_INPUT_OPTIONS,
): string {
  const { min, max, maxPrecision } = options;
  // set input to empty string
  if (!newStringValue) {
    return "";
  }

  // if user leads with a '.'
  if (newStringValue === ".") {
    return "0.";
  }

  // or validate and set it
  if (getIsValidNumericInput(newStringValue, min, max, maxPrecision)) {
    return newStringValue;
  }

  // if the value isn't valid, then we shouldn't update the input
  return currentStringValue;
}

export function getIsValidNumericInput(
  inputString: string,
  min?: number,
  max?: number,
  maxPrecision?: number,
): boolean {
  const inputValue = Number(inputString);
  if (!ANY_NUMBER_REGEX.test(inputString)) {
    return false;
  }

  if (!isFiniteNumber(inputValue)) {
    return false;
  }

  if (isFiniteNumber(min)) {
    if (inputValue < min) {
      return false;
    }
  }

  if (isFiniteNumber(max)) {
    if (inputValue > max) {
      return false;
    }
  }

  if (isIntegerNumber(maxPrecision)) {
    const placesAfterDecimal = getPlacesAfterDecimal(inputString);
    if (placesAfterDecimal > maxPrecision) {
      return false;
    }
  }

  return true;
}
