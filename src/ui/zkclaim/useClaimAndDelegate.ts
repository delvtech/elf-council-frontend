import { UseMutationResult } from "react-query";

import { PrivateAirdrop } from "@elementfi/elf-council-typechain";
import { ContractReceipt, Signer } from "ethers";
import { privateAirdropContract } from "src/elf/contracts";
import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain";

export function useClaimAndDelegate(
  signer: Signer | undefined,
  options?: UseSmartContractTransactionOptions<
    PrivateAirdrop,
    "claimAirdropAndDelegate"
  >,
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<PrivateAirdrop["claimAirdropAndDelegate"]>
> {
  const claimAndDelegate = useSmartContractTransaction(
    privateAirdropContract,
    "claimAirdropAndDelegate",
    signer,
    options,
  );
  return claimAndDelegate;
}
