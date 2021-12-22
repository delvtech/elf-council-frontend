import { useRouter } from "next/router";
import { useMemo } from "react";

/**
 * The query object of the Next.js useRouter hook returns an array for
 * parameters that appear more than once in a URL. This function returns only
 * the last values to ensure each parameter is a string or undefined.
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
        {}
      ),
    [query]
  );
}
