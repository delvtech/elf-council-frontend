import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "@ethersproject/units";
import { airdropContract } from "src/elf/contracts";

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
