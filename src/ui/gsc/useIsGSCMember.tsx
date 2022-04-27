import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { QueryObserverResult } from "react-query";
import { gscVaultContract } from "src/elf/contracts";

export function useIsGSCMember(
  account: string | null | undefined,
): QueryObserverResult<boolean> {
  return useSmartContractReadCall(gscVaultContract, "members", {
    callArgs: [account as string],
    enabled: !!account,
    // if there is a valid timestamp, the user is on the GSC, if it is zero, that indicates there is
    // no entry.
    select: (timeStamp) => !!timeStamp.toNumber(),
  });
}
