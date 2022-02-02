import { QueryObserverResult, useQuery } from "react-query";
import { defaultProvider } from "src/elf/providers/providers";

export function useLatestBlockNumber(): QueryObserverResult<
  number | undefined,
  unknown
> {
  const queryResult = useQuery({
    queryKey: "latest-block-number",
    queryFn: () => {
      return defaultProvider.getBlockNumber();
    },
    refetchInterval: 5000,
    keepPreviousData: true,
    enabled: !!defaultProvider,
  });

  return queryResult;
}
