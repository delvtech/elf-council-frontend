import { formatEther } from "@ethersproject/units";
import { rewardsContract } from "src/elf/contracts";
import { useSmartContractReadCall } from "src/react-query-typechain/hooks/useSmartContractReadCall/useSmartContractReadCall";

export function useClaimed(address: string | undefined | null): string {
  const { data: claimedBN } = useSmartContractReadCall(
    rewardsContract,
    "claimed",
    {
      callArgs: [address as string],
      enabled: !!address,
    }
  );

  return formatEther(claimedBN || 0);
}
