import { lockingVaultContract } from "src/elf/contracts";
import { toast } from "react-hot-toast";
import { ContractReceipt, Signer } from "ethers";
import { UseMutationResult } from "react-query";
import { LockingVault } from "elf-council-typechain";
import {
  makeSmartContractReadCallQueryKey,
  useSmartContractTransaction,
} from "@elementfi/react-query-typechain";
import { queryClient } from "src/elf/queryClient";

export function useChangeDelegation(
  address: string | null | undefined,
  signer: Signer | undefined,
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<LockingVault["changeDelegation"]>
> {
  return useSmartContractTransaction(
    lockingVaultContract,
    "changeDelegation",
    signer,
    {
      onError: (e) => {
        toast.error(e.message);
      },
      onTransactionMined: () => {
        // Invalidate `deposits` so that consumers of `useDelegate` refresh
        queryClient.invalidateQueries(
          makeSmartContractReadCallQueryKey(
            lockingVaultContract.address,
            "deposits",
            [address as string],
          ),
        );
      },
    },
  );
}
