import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "@ethersproject/units";
import { rewardsContract } from "src/elf/contracts";

export function useClaimedRewards(address: string | undefined | null): string {
  const { data: claimedBN } = useSmartContractReadCall(
    rewardsContract,
    "claimed",
    {
      callArgs: [address as string],
      enabled: !!address,
    },
  );

  return formatEther(claimedBN || 0);
}
