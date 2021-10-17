import { QueryObserverResult } from "react-query";

import { ERC20Permit } from "elf-council-typechain";
import { BigNumber } from "ethers";
import { useSmartContractReadCall } from "src/react-query-typechain/hooks/useSmartContractReadCall/useSmartContractReadCall";

export function useTokenBalanceOf(
  contract: ERC20Permit | undefined,
  address: string | null | undefined
): QueryObserverResult<BigNumber> {
  return useSmartContractReadCall(contract, "balanceOf", {
    callArgs: [address as string], // safe to cast because `enabled` is set
    enabled: !!address,
  });
}
