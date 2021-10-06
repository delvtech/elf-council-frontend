import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { Contract, Event } from "ethers";
import {
  ContractFilterName,
  ContractFilterArgs,
} from "src/efi-contract-hooks/types";

export interface UseSmartContractEventsCallOptions<
  TContract extends Contract,
  TFilterName extends ContractFilterName<TContract>
> {
  callArgs?: ContractFilterArgs<TContract, TFilterName>;
  enabled?: boolean;

  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  fromBlock?: number;
  toBlock?: number;
}

export function useSmartContractEvents<
  TContract extends Contract,
  TFilterName extends ContractFilterName<TContract>
>(
  contract: TContract | undefined,
  filterName: TFilterName,
  options?: UseSmartContractEventsCallOptions<TContract, TFilterName>
): QueryObserverResult<Event[]> {
  const queryOptions = makeSmartContractEventsUseQueryOptions<
    TContract,
    TFilterName
  >(contract, filterName, options);

  const queryResult = useQuery(queryOptions);

  return queryResult;
}

export function makeSmartContractEventsUseQueryOptions<
  TContract extends Contract,
  TFilterName extends ContractFilterName<TContract>
>(
  contract: TContract | undefined,
  filterName: TFilterName,
  options?: UseSmartContractEventsCallOptions<TContract, TFilterName>
): UseQueryOptions<Event[]> {
  const {
    enabled = true,
    staleTime,
    cacheTime,
    refetchOnWindowFocus,
    callArgs,
    fromBlock,
    toBlock,
  } = options || {};

  const queryKey = makeSmartContractEventsQueryKey<TContract, TFilterName>(
    contract,
    filterName,
    callArgs,
    fromBlock,
    toBlock
  );

  const queryFn = async (): Promise<Event[]> => {
    // this function is not called until contract is defined, so safe to cast.
    const finalContract = contract as TContract;

    const finalArgs = callArgs || [];
    const eventFilter = finalContract.filters[filterName as string](
      ...finalArgs
    );
    const result = await finalContract.queryFilter(
      eventFilter,
      fromBlock,
      toBlock
    );
    return result;
  };

  return {
    queryKey,
    queryFn,
    onError: () => {
      console.error(
        `Error calling ${filterName} on: ${contract?.address} with arguments:`,
        callArgs
      );
    },
    enabled: !!contract && enabled,
    staleTime,
    cacheTime,
    refetchOnWindowFocus,
  };
}

export function makeSmartContractEventsQueryKey<
  TContract extends Contract,
  TFilterName extends ContractFilterName<TContract>
>(
  contract: TContract | undefined,
  filterName: TFilterName,
  callArgs: Parameters<TContract["filters"][TFilterName]> | undefined,
  fromBlock?: number,
  toBlock?: number
): [
  string,
  TFilterName,
  string | undefined,
  number | undefined,
  number | undefined,
  Parameters<TContract["filters"][TFilterName]> | undefined
] {
  return [
    "contractQueryFilter",
    filterName,
    contract?.address,
    fromBlock,
    toBlock,
    callArgs,
  ];
}
