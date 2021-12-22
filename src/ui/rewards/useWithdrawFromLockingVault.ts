import { UseMutationResult } from "react-query";

import { LockingVault } from "elf-council-typechain";
import { ContractReceipt, Signer } from "ethers";
import { lockingVaultContract } from "src/elf/contracts";
import { useSmartContractTransaction } from "@elementfi/react-query-typechain";

export function useWithdrawFromLockingVault(
  signer: Signer | undefined,
  onSuccess?: () => void
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<LockingVault["withdraw"]>
> {
  const withdraw = useSmartContractTransaction(
    lockingVaultContract,
    "withdraw",
    signer,
    { onTransactionMined: onSuccess }
  );
  return withdraw;
}
