import { useCallback, useMemo, useState } from "react";

type Callback = (...args: any[]) => any;

function workerFunction<TCallback extends Callback>(fn: TCallback) {
  onmessage = ({ data: args }: { data: Parameters<TCallback> }) => {
    // babel converts spread arrays to a function called _toConsumableArray which
    // isn't defined in the web worker.
    // eslint-disable-next-line prefer-spread
    const result = fn.apply(null, args);

    // If async, return the resolved value instead of the promise.
    // A better way to check if result is a promise would be
    // `result instanceOf Promise`, but babel converts instanceOf to _instanceOf
    // which isn't defined inside the worker.
    if (result?.then) {
      result.then((res: ReturnType<TCallback>) => {
        postMessage(res);
      });
    } else {
      postMessage(result);
    }
  };
}

export function wrapInWorker<TCallback extends Callback>(
  fn: TCallback,
): (...args: Parameters<TCallback>) => Worker {
  return function (...args: Parameters<TCallback>) {
    // uses IIFE to automatically invoke the function in the worker.
    const workerBlob = new Blob([`(${workerFunction})(${fn})`], {
      type: "text/javascript",
    });
    const worker = new Worker(window.URL.createObjectURL(workerBlob));
    worker.postMessage(args);
    return worker;
  };
}

interface UseWorkerResult<TCallback extends Callback> {
  run: (...args: Parameters<TCallback>) => void;
  hasRun: boolean;
  loading: boolean;
  data?: Awaited<ReturnType<TCallback>>;
  // Defined when an error event occurs in the worker
  error?: ErrorEvent;
  // Defined when the worker receives a message that can't be deserialized.
  messageError?: MessageEvent;
}

export default function useWorker<TCallback extends Callback>(
  fn: TCallback,
): UseWorkerResult<TCallback> {
  const [hasRun, setHasRun] = useState(false);
  const [state, setState] = useState<
    Omit<UseWorkerResult<TCallback>, "run" | "hasRun">
  >({
    loading: false,
  });

  const wrappedFunction = useMemo(() => wrapInWorker(fn), [fn]);

  const run = useCallback(
    (...args: Parameters<TCallback>) => {
      setHasRun(true);
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
    hasRun,
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
