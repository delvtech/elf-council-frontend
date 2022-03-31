import { FixedNumber } from "ethers";
import { MerkleProof } from "src/elf/merkle/MerkleProof";
import { useClaimedAirdrop } from "src/ui/airdrop/useClaimedAirdrop";

export function useUnclaimedAirdrop(
  account: string | undefined | null,
  merkleInfo: MerkleProof | undefined,
): string {
  const claimed = useClaimedAirdrop(account);
  const { value: totalGrant = "0" } = merkleInfo?.leaf || {};

  const unclaimed = FixedNumber.from(totalGrant)
    .subUnsafe(FixedNumber.from(claimed))
    .toString();

  if (Number(unclaimed) <= 0) {
    return "0";
  }

  return unclaimed;
}
