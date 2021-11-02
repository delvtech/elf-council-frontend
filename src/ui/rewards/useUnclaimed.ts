import { FixedNumber } from "ethers";
import { MerkleProof } from "src/elf/merkle/MerkleProof";
import { useClaimed } from "src/ui/rewards/useClaimed";

export function useUnclaimed(
  account: string | undefined | null,
  merkleInfo: MerkleProof | undefined
): string {
  const claimed = useClaimed(account);
  const { value: totalGrant = "0" } = merkleInfo?.leaf || {};

  const unclaimed = FixedNumber.from(totalGrant)
    .subUnsafe(FixedNumber.from(claimed))
    .toString();

  return unclaimed;
}
