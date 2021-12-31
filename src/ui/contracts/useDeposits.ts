import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { BigNumber } from "ethers";
import { QueryObserverResult } from "react-query";
import { lockingVaultContract } from "src/elf/contracts";

export function useDeposits(
  account: string | null | undefined,
): QueryObserverResult<
  [
    // delegate
    string,
    // amount delegated
    BigNumber,
  ]
> {
  return useSmartContractReadCall(lockingVaultContract, "deposits", {
    callArgs: [account as string],
    enabled: !!account,
  });
}
