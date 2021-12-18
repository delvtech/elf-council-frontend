import { formatEther } from "@ethersproject/units";
import { airdropContract } from "src/elf/contracts";
import { useSmartContractReadCall } from "src/react-query-typechain/hooks/useSmartContractReadCall/useSmartContractReadCall";

export function useClaimedAirdrop(address: string | undefined | null): string {
  const { data: claimedBN } = useSmartContractReadCall(
    airdropContract,
    "claimed",
    {
      callArgs: [address as string],
      enabled: !!address,
    }
  );

  return formatEther(claimedBN || 0);
}
