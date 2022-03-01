import { OptimisticRewards } from "elf-council-typechain";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useQueryVotePower } from "src/ui/voting/useQueryVotePower";

export function useRewardsVaultVotingPower(
  account: string | undefined | null,
  contract: OptimisticRewards,
  atBlockNumber?: number,
): string {
  const { data: merkleInfo } = useMerkleInfo(account);

  const { value: totalGrant } = merkleInfo?.leaf || {};
  const { proof = [] } = merkleInfo || {};

  const extraData =
    !!totalGrant && !!proof
      ? ethers.utils.defaultAbiCoder.encode(
          ["uint256", "bytes32[]"],
          [parseEther(totalGrant), proof],
        )
      : undefined;

  return useQueryVotePower(account, contract, atBlockNumber, extraData);
}
