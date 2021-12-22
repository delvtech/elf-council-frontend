import { useRouter } from "next/router";
import { useMemo } from "react";

/**
 * returns query params in the URL in an object. If a param appears more than
 * once, it only returns the last value (e.g. ?foo=baz&foo=bar returns "bar").
 * This makes dealing with types a bit easier since useRouter returns an array
 * for params that appear more than once
 * (e.g. ?foo=baz&foo=bar returns ["baz", "bar"]).
 */
export function useParams(): { [key: string]: string | undefined } {
  const { query } = useRouter();

  return useMemo(
    () =>
      Object.entries(query).reduce(
        (reduced, [key, value]) => ({
          ...reduced,
          [key]: Array.isArray(value) ? value.slice(-1)[0] : value,
        }),
        {},
      ),
    [query],
  );
}
