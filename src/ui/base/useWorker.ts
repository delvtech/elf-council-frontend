import { useCallback, useMemo, useState } from "react";

const workerFunction = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  args: Args,
) => {
  // babel converts spread arrays to a function called _toConsumableArray which
  // isn't defined in the web worker.
  // eslint-disable-next-line prefer-spread
  const data = fn.apply(null, args);
  // eslint-disable-next-line no-restricted-globals
  self.postMessage(data);
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

interface UseWorkerResult<TCallback extends (...args: any[]) => void> {
  run: (...args: Parameters<TCallback>) => void;
  loading: boolean;
  data: ReturnType<TCallback> | undefined;
}

export default function useWorker<TCallback extends (...args: any[]) => any>(
  fn: TCallback,
): UseWorkerResult<TCallback> {
  const [state, setState] = useState<Omit<UseWorkerResult<TCallback>, "run">>({
    loading: false,
    data: undefined,
  });

  const wrappedFunction = useMemo(() => wrapInWorker(fn), [fn]);

  const run = useCallback(
    (...args: Parameters<TCallback>) => {
      setState((prevState) => ({ ...prevState, loading: true }));
      const worker = wrappedFunction(...args);
      worker.onmessage = ({ data }) => {
        setState({ loading: false, data });
      };
    },
    [wrappedFunction],
  );

  return {
    run,
    ...state,
  };
}
