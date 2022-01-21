import { useCallback, useMemo, useState } from "react";

const workerFunction = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  args: Args,
) => {
  // babel converts spread arrays to a function called _toConsumableArray which
  // isn't defined in the web worker.
  // eslint-disable-next-line prefer-spread
  const result = fn.apply(null, args);
  // eslint-disable-next-line no-restricted-globals
  self.postMessage(result);
};

export function wrapInWorker<Args extends unknown[]>(
  fn: (...args: Args) => void,
): (...args: Args) => Worker {
  return function (...args: Args) {
    // uses IIFE to automatically invoke the function in the worker.
    // uses JSON.stringify to ensure strings stay strings when concatenated in
    // the template literal.
    const workerBlob = new Blob(
      [`(${workerFunction})(${fn}, ${JSON.stringify(args)})`],
      {
        type: "text/javascript",
      },
    );
    return new Worker(window.URL.createObjectURL(workerBlob));
  };
}

export default function useWorker<Args extends unknown[], ReturnType>(
  fn: (...args: Args) => ReturnType,
): [
  (...args: Args) => void,
  {
    loading: boolean;
    result: ReturnType | undefined;
  },
] {
  const [state, setState] = useState<{
    loading: boolean;
    result: ReturnType | undefined;
  }>({ loading: false, result: undefined });

  const wrappedFunction = useMemo(() => wrapInWorker(fn), [fn]);

  const run = useCallback(
    (...args: Args) => {
      setState((prevState) => ({ ...prevState, loading: true }));
      const worker = wrappedFunction(...args);
      worker.onmessage = ({ data }) => {
        setState({ loading: false, result: data });
      };
    },
    [wrappedFunction],
  );

  return [run, state];
}
