import { lockingVaultContract } from "src/elf/contracts";
import { ContractReceipt, Signer } from "ethers";
import { UseMutationResult } from "react-query";
import { LockingVault } from "elf-council-typechain";
import { useSmartContractTransaction } from "@elementfi/react-query-typechain";

export function useChangeDelegation(
  signer: Signer | undefined
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<LockingVault["changeDelegation"]>
> {
  return useSmartContractTransaction(
    lockingVaultContract,
    "changeDelegation",
    signer
  );
}
