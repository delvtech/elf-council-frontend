import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "ethers/lib/utils";
import { lockingVaultContract } from "src/elf/contracts";
import {} from "src/ui/voting/useQueryVotePower";

/**
 * Use this to get the amount deposited into the locking vault for an account.
 */
export function useLockingVaultBalance(
  account: string | undefined | null,
): string {
  // data is returned as [address, amount]
  const { data } = useSmartContractReadCall(lockingVaultContract, "deposits", {
    callArgs: [account as string],
    enabled: !!account,
  });
  const balance = formatEther(data?.[1] || 0);
  return balance;
}
