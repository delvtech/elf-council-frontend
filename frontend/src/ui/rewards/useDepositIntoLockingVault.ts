import { UseMutationResult } from "react-query";

import { LockingVault } from "elf-council-typechain";
import { ContractReceipt, Signer } from "ethers";
import { lockingVaultContract } from "src/elf/contracts";
import { useSmartContractTransaction } from "src/react-query-typechain/hooks/useSmartContractTransaction/useSmartContractTransaction";

export function useDepositIntoLockingVault(
  signer: Signer | undefined,
  onSuccess?: () => void
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<LockingVault["deposit"]>
> {
  const deposit = useSmartContractTransaction(
    lockingVaultContract,
    "deposit",
    signer,
    { onTransactionMined: onSuccess }
  );
  return deposit;
}
