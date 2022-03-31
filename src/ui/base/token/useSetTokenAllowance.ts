import { UseMutationResult } from "react-query";

import {
  ERC20Permit,
  ERC20Permit__factory,
} from "@elementfi/elf-council-typechain";
import { ContractReceipt, Signer } from "ethers";
import { useSmartContractTransaction } from "@elementfi/react-query-typechain";

export function useSetTokenAllowance(
  signer: Signer | undefined,
  tokenAddress: string,
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<ERC20Permit["approve"]>
> {
  const tokenContract: ERC20Permit | undefined = signer
    ? ERC20Permit__factory.connect(tokenAddress, signer)
    : undefined;

  const approve = useSmartContractTransaction(tokenContract, "approve", signer);
  return approve;
}
