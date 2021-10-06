import { Query } from "react-query";

import { Contract } from "@ethersproject/contracts";
import isEqual from "lodash.isequal";
import { ContractMethodName } from "src/efi-contract-hooks/types";
import { makeSmartContractReadCallQueryKey } from "src/efi-contract-hooks/hooks/useSmartContractReadCall/useSmartContractReadCall";

/**
 * Utility for matching smart contract read call queries when busting the cache.
 */
export function matchSmartContractReadCallQuery<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>
>(
  query: Query,
  contractAddress: string | undefined,
  methodName: TMethodName,
  callArgs: Parameters<TContract["functions"][TMethodName]> | undefined
): boolean {
  const match = isEqual(
    query.queryKey,
    makeSmartContractReadCallQueryKey(contractAddress, methodName, callArgs)
  );
  return match;
}
