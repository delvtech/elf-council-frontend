import { useMemo } from "react";

/*
Basic Usage Example:
````````````````````````````````````````````````````````````````````````````````
const [handleChange, cancel] = 
  useDebounceFunction({ target } => console.log(target.value), 300)

<input onChange={handleChange} />

// the value won't be logged until there's a 300ms pause from the last time it
// was changed.
````````````````````````````````````````````````````````````````````````````````
*/

/**
 * Wraps a function in a timeout which resets each time it's called.
 *
 * @param callback The function to call after the timer ends.
 * @param delay The time to wait before calling the function.
 * @returns {[Function]} An array where the first item is a function that takes
 *          the same arguments as the callback, clears the timeout and calls the
 *          callback with the new arguments after the timer ends. The second
 *          item is a function to simply clear the timeout.
 */
export const useDebounceFunction = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
): [(...args: T) => void, () => void] =>
  useMemo(() => {
    let timer: NodeJS.Timeout;
    return [
      (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
      },
      () => clearTimeout(timer),
    ];
  }, [callback, delay]);
