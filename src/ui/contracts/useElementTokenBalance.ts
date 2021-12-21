import { elementTokenContract } from "src/elf/contracts";
import { BigNumber } from "@ethersproject/bignumber";
import { QueryObserverResult } from "react-query";
import { useSmartContractReadCall } from "@elementfi/react-query-typechain";

export function useElementTokenBalanceOf(
  account: string | null | undefined
): QueryObserverResult<BigNumber> {
  return useSmartContractReadCall(elementTokenContract, "balanceOf", {
    enabled: !!account,
    callArgs: [account as string],
  });
}
