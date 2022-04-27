import { Provider } from "@ethersproject/providers";
import { QueryObserverResult, useQuery } from "react-query";

export function useENSName(
  account: string | null | undefined,
  provider?: Provider,
): QueryObserverResult<string> {
  return useQuery({
    queryKey: ["provider", "lookupAddress", account],
    queryFn: () => {
      return provider?.lookupAddress(
        // safe to cast because enabled is set
        account as string,
      );
    },
    enabled: !!account && !!provider,
  });
}
