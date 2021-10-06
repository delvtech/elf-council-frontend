import { Contract } from "ethers";

/**
 * Gets a type for 'callStatic' contract call
 */
export type StaticContractCall<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>
> = TContract["callStatic"][TMethodName];

/**
 * Gets a type for a contract call
 */
export type ContractCall<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>
> = TContract[TMethodName];

/**
 * Gets a type for a contract query call
 */
export type ContractFilterCall<
  TContract extends Contract,
  TFilterName extends ContractFilterName<TContract>
> = TContract["filters"][TFilterName];

export type ContractQueryFilterCall<TContract extends Contract> =
  TContract["queryFilter"];
/**
 * Gets a type for the specific contract call
 */
export type ContractFunctionCall<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>
> = TContract["functions"][TMethodName];

/**
 * Gets a type for the methods available on a given contract
 */
export type ContractMethodName<TContract extends Contract> =
  keyof TContract["functions"];

/**
 * Gets a type for the filters available on a given contract
 */
export type ContractFilterName<TContract extends Contract> =
  keyof TContract["filters"];

/**
 * Gets a type for the return type of the given contract call
 */
export type ContractReturnType<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>
> = ReturnType<ContractCall<TContract, TMethodName>>;

export type StaticContractReturnType<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>
> = ReturnType<StaticContractCall<TContract, TMethodName>>;

export type ContractQueryReturnType<TContract extends Contract> = ReturnType<
  ContractQueryFilterCall<TContract>
>;

/**
 * Gets a type for the call arguments of a given contract and method name
 */
export type ContractMethodArgs<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>
> = Parameters<ContractFunctionCall<TContract, TMethodName>>;

export type StaticContractMethodArgs<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>
> = Parameters<StaticContractCall<TContract, TMethodName>>;

/**
 * Gets a type for the call arguments of a given contract and method name
 */
export type ContractFilterArgs<
  TContract extends Contract,
  TFilterName extends ContractFilterName<TContract>
> = Parameters<ContractFilterCall<TContract, TFilterName>>;
