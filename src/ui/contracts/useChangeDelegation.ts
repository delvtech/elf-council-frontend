import { lockingVaultContract } from "src/elf/contracts";
import { toast, Toast } from "react-hot-toast";
import { ContractReceipt, Signer } from "ethers";
import { UseMutationResult } from "react-query";
import { LockingVault } from "elf-council-typechain";
import {
  makeSmartContractReadCallQueryKey,
  useSmartContractTransaction,
} from "@elementfi/react-query-typechain";
import { queryClient } from "src/elf/queryClient";
import { useRef } from "react";

export function useChangeDelegation(
  address: string | null | undefined,
  signer: Signer | undefined,
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<LockingVault["changeDelegation"]>
> {
  const toastIdRef = useRef<string>();

  return useSmartContractTransaction(
    lockingVaultContract,
    "changeDelegation",
    signer,
    {
      onError: (e) => {
        toast.dismiss(toastIdRef.current);
        toast.error(e.message);
      },
      onTransactionSubmitted: () => {
        toastIdRef.current = toast.loading("Changing delegation");
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
        toast.dismiss(toastIdRef.current);
        toast.success("Delegation successfully changed");
      },
    },
  );
}
