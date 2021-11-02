import { BigNumber } from "ethers";
import { QueryObserverResult } from "react-query";
import { lockingVaultContract } from "src/elf/contracts";
import { useSmartContractReadCall } from "src/react-query-typechain/hooks/useSmartContractReadCall/useSmartContractReadCall";

export function useDeposits(
  account: string | null | undefined
): QueryObserverResult<
  [
    // delegate
    string,
    // amount delegated
    BigNumber
  ]
> {
  return useSmartContractReadCall(lockingVaultContract, "deposits", {
    callArgs: [account as string],
    enabled: !!account,
  });
}
