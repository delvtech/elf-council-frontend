import { useCallback, useState } from "react";

import {
  DEFAULT_NUMERIC_INPUT_OPTIONS,
  NumericValueOptions,
  validateNumericInput,
} from "src/ui/base/Input/validateNumericInput";

/**
 * A hook to handle validation of numeric values from user input.  All values are handled as strings
 * since this deals with user input.
 * @param options
 * @returns
 */
export function useNumericInputValue(
  options: NumericValueOptions = DEFAULT_NUMERIC_INPUT_OPTIONS
): {
  value: string;
  setNumericValue: (value: string) => void;
} {
  const [value, setValue] = useState("");
  const setNumericValue = useCallback(
    (newValue: string) => {
      setValue(validateNumericInput(value, newValue, options));
    },
    [options, value]
  );

  return { value, setNumericValue };
}
