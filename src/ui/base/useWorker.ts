import { useCallback, useMemo, useState } from "react";

type Callback = (...args: any[]) => any;

const workerFunction = <TCallback extends Callback>(
  fn: TCallback,
  args: Parameters<TCallback>,
) => {
  // babel converts spread arrays to a function called _toConsumableArray which
  // isn't defined in the web worker.
  // eslint-disable-next-line prefer-spread
  const data = fn.apply(null, args);

  // If async, return the resolved value instead of the promise.
  // A better way to check if data is a promise would be
  // `data instanceOf Promise`, but babel converts instanceOf to _instanceOf
  // which isn't defined inside the worker.
  if (data.then) {
    data.then((res: ReturnType<TCallback>) => {
      // eslint-disable-next-line no-restricted-globals
      self.postMessage(res);
    });
  } else {
    // eslint-disable-next-line no-restricted-globals
    self.postMessage(data);
  }
};

export function wrapInWorker<TCallback extends Callback>(
  fn: TCallback,
): (...args: Parameters<TCallback>) => Worker {
  return function (...args: Parameters<TCallback>) {
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

interface UseWorkerResult<TCallback extends Callback> {
  run: (...args: Parameters<TCallback>) => void;
  loading: boolean;
  data?: Awaited<ReturnType<TCallback>>;
  error?: ErrorEvent;
  messageError?: MessageEvent;
}

export default function useWorker<TCallback extends Callback>(
  fn: TCallback,
): UseWorkerResult<TCallback> {
  const [state, setState] = useState<Omit<UseWorkerResult<TCallback>, "run">>({
    loading: false,
    data: undefined,
    error: undefined,
    messageError: undefined,
  });

  const wrappedFunction = useMemo(() => wrapInWorker(fn), [fn]);

  const run = useCallback(
    (...args: Parameters<TCallback>) => {
      setState((prevState) => ({ ...prevState, loading: true }));
      const worker = wrappedFunction(...args);
      worker.onmessage = ({ data }) => {
        setState({ loading: false, data });
      };
      worker.onerror = (error) => {
        setState({ loading: false, error });
      };
      worker.onmessageerror = (messageError) => {
        setState({ loading: false, messageError });
      };
    },
    [wrappedFunction],
  );

  return {
    run,
    ...state,
  };
}

export function useWorkerPromise<TCallback extends Callback>(
  fn: TCallback,
): (...args: Parameters<TCallback>) => Promise<ReturnType<TCallback>> {
  return useCallback(
    (...args: Parameters<TCallback>) =>
      new Promise((resolve, reject) => {
        const worker = wrapInWorker(fn)(...args);
        worker.onmessage = ({ data }) => {
          resolve(data);
        };
        worker.onerror = reject;
        worker.onmessageerror = reject;
      }),
    [fn],
  );
}
