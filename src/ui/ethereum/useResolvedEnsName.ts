import { Provider } from "@ethersproject/providers";
import { QueryObserverResult, useQuery } from "react-query";
import { defaultProvider } from "src/elf/providers/providers";

export function useResolvedEnsName(
  name: string | null | undefined,
  provider: Provider = defaultProvider,
): QueryObserverResult<string> {
  return useQuery({
    queryKey: ["provider", "resolveName", name],
    queryFn: () =>
      provider?.resolveName(
        // safe to cast because enabled is set
        name as string,
      ),
    enabled: !!name && !!provider,
  });
}
