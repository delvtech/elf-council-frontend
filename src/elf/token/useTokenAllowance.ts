import { QueryObserverResult } from "react-query";

import { ERC20Permit } from "@elementfi/elf-council-typechain";
import { BigNumber } from "ethers";
import { useSmartContractReadCall } from "@elementfi/react-query-typechain";

export function useTokenAllowance(
  contract: ERC20Permit | undefined,
  owner: string | null | undefined,
  spender: string | null | undefined,
): QueryObserverResult<BigNumber> {
  return useSmartContractReadCall(contract, "allowance", {
    callArgs: [owner as string, spender as string], // safe to cast because `enabled` is set
    enabled: !!owner && !!spender,
  });
}
