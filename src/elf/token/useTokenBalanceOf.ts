import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { ERC20Permit } from "elf-council-typechain";
import { BigNumber } from "ethers";
import { QueryObserverResult } from "react-query";

export function useTokenBalanceOf(
  contract: ERC20Permit | undefined,
  address: string | null | undefined,
): QueryObserverResult<BigNumber> {
  return useSmartContractReadCall(contract, "balanceOf", {
    callArgs: [address as string], // safe to cast because `enabled` is set
    enabled: !!address,
  });
}
