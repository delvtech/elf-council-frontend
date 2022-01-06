import { ContractReceipt, Signer } from "ethers";
import { UseMutationResult } from "react-query";
import {
  useSmartContractTransaction,
  makeSmartContractReadCallQueryKey,
} from "@elementfi/react-query-typechain";
import { LockingVault } from "elf-council-typechain";
import { lockingVaultContract, elementTokenContract } from "src/elf/contracts";
import { queryClient } from "src/elf/queryClient";

export function useDepositIntoLockingVault(
  signer: Signer | undefined,
  address: string | null | undefined,
  onSuccess?: () => void,
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<LockingVault["deposit"]>
> {
  const deposit = useSmartContractTransaction(
    lockingVaultContract,
    "deposit",
    signer,
    {
      onTransactionMined: () => {
        queryClient.invalidateQueries(
          makeSmartContractReadCallQueryKey(
            elementTokenContract.address,
            "balanceOf",
            [address as string],
          ),
        );

        queryClient.invalidateQueries(
          makeSmartContractReadCallQueryKey(
            lockingVaultContract.address,
            "deposits",
            [address as string],
          ),
        );

        if (onSuccess) {
          onSuccess();
        }
      },
    },
  );
  return deposit;
}
