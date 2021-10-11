import { useSmartContractReadCall } from "src/react-query-typechain/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { elementTokenContract } from "src/elf/contracts";
import { BigNumber } from "@ethersproject/bignumber";
import { QueryObserverResult } from "react-query";

export function useElementTokenBalanceOf(
  account: string | null | undefined
): QueryObserverResult<BigNumber> {
  return useSmartContractReadCall(elementTokenContract, "balanceOf", {
    enabled: !!account,
    callArgs: [account as string],
  });
}
