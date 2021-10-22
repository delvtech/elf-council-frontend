import { FixedNumber } from "@ethersproject/bignumber";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useClaimed } from "src/ui/rewards/useClaimed";

export function useUnclaimed(address: string | undefined | null): string {
  const { data: merkleInfo } = useMerkleInfo(address);
  const claimed = useClaimed(address);

  const totalGrantFN = FixedNumber.fromString(merkleInfo?.leaf?.value || "0");
  const claimedFN = FixedNumber.fromString(claimed);
  const unclaimed = totalGrantFN.subUnsafe(claimedFN);
  return unclaimed.toString();
}
