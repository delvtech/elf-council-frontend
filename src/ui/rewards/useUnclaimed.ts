import { FixedNumber } from "ethers";
import { MerkleProof } from "src/elf/merkle/MerkleProof";
import { useClaimedRewards } from "src/ui/rewards/useClaimed";

export function useUnclaimedRewards(
  account: string | undefined | null,
  merkleInfo: MerkleProof | undefined
): string {
  const claimed = useClaimedRewards(account);
  const { value: totalGrant = "0" } = merkleInfo?.leaf || {};

  const unclaimed = FixedNumber.from(totalGrant)
    .subUnsafe(FixedNumber.from(claimed))
    .toString();

  return unclaimed;
}
