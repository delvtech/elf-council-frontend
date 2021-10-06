import { Contract } from "ethers";
import isPlainObject from "lodash.isplainobject";
import zip from "lodash.zip";
import { QueryObserverResult, useQueries, UseQueryOptions } from "react-query";
import {
  makeSmartContractReadCallUseQueryOptions,
  UseSmartContractReadCallOptions,
} from "src/efi-contract-hooks/hooks/useSmartContractReadCall/useSmartContractReadCall";
import {
  ContractMethodName,
  StaticContractReturnType,
} from "src/efi-contract-hooks/types";
import { Unpacked } from "src/efi-contract-hooks/Unpacked";

/**
 * A hook for calling the same method on a list of contracts.
 *
 * Example:
 *
 * const contracts = [wethContract, usdcContract];
 * const [{ data: wethSymbol }, { data: usdcSymbol }] = useSmartContractReadCalls(
 *   contracts,
 *   "symbol"
 * );
 *
 * Example with call args:
 *
 * const [
 *   { data: wethMarket },
 *   { data: usdcMarket },
 * ] = useSmartContractReadCalls(contracts, "getSpotPrice", [
 *   { callArgs: ["0xSomeToken"] },
 *   { callArgs: ["0xAnotherToken"] },
 * ]);
 */
export function useSmartContractReadCalls<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract> = ContractMethodName<TContract>,
  TContractData extends Unpacked<
    StaticContractReturnType<TContract, TMethodName>
  > = Unpacked<StaticContractReturnType<TContract, TMethodName>>,
  TData = TContractData
>(
  contracts: (TContract | undefined)[],
  methodName: TMethodName,
  options?:
    | (
        | UseSmartContractReadCallOptions<
            TContract,
            TMethodName,
            TContractData,
            TData
          >
        | undefined
      )[]
    | UseSmartContractReadCallOptions<
        TContract,
        TMethodName,
        TContractData,
        TData
      >
): QueryObserverResult<TContractData>[] {
  let optionsArray: (
    | UseSmartContractReadCallOptions<
        TContract,
        TMethodName,
        TContractData,
        TData
      >
    | undefined
  )[] = [];

  if (!options || isPlainObject(options)) {
    optionsArray = contracts.map(() => options) as (
      | UseSmartContractReadCallOptions<
          TContract,
          TMethodName,
          TContractData,
          TData
        >
      | undefined
    )[];
  } else if (options && Array.isArray(options)) {
    optionsArray = options;
  }

  const queryOptions = zip(contracts, optionsArray).map(([contract, options]) =>
    makeSmartContractReadCallUseQueryOptions(contract, methodName, options)
  );

  // Cast this to unkown when calling useQueries, because useQueries does not
  // yet support generics and string and unknown are incompatible types.
  const queryResult = useQueries(
    queryOptions as UseQueryOptions<unknown, unknown, unknown>[]
  ) as QueryObserverResult<TContractData, unknown>[];

  return queryResult;
}
