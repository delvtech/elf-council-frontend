import { formatEther } from "@ethersproject/units";
import { OptimisticRewards } from "elf-council-typechain";
import { BigNumber, ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { rewardsContract } from "src/elf/contracts";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useSmartContractReadCall } from "src/react-query-typechain/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";

export function useRewardsVaultVotingPower(
  account: string | undefined | null,
  contract: OptimisticRewards,
  atblockNumber?: number
): string {
  const { data: latestBlockNumber } = useLatestBlockNumber();
  const { data: merkleInfo } = useMerkleInfo(account);

  const blockNumber = atblockNumber || latestBlockNumber;
  const { value: totalGrant } = merkleInfo?.leaf || {};
  const { proof = [] } = merkleInfo || {};

  const extraData = ethers.utils.defaultAbiCoder.encode(
    ["uint256", "bytes32[]"],
    [parseEther(totalGrant || "0"), proof]
  );

  // The CoreVoting contract passes this parameter to the rewards contract when querying vote power,
  // so we have to pass it as well, though the rewards contract doesn't need this to calculate vote
  // power.
  const unusedBlockNumber = BigNumber.from(0);
  const { data: rewardsVotingPowerBN } = useSmartContractReadCall(
    rewardsContract,
    "queryVotePower",
    {
      callArgs: [account as string, unusedBlockNumber, extraData],
      enabled: !!account && !!blockNumber && !!totalGrant && !!proof,
    }
  );

  const rewardsVotingPower = formatEther(rewardsVotingPowerBN || 0);

  return rewardsVotingPower;
}
