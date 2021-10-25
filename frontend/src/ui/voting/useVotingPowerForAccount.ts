import { formatEther } from "@ethersproject/units";
import { ethers, FixedNumber } from "ethers";
import { lockingVaultContract, rewardsContract } from "src/elf/contracts";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useSmartContractReadCall } from "src/react-query-typechain/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";

export function useVotingPowerForAccount(
  account: string | undefined | null,
  atblockNumber?: number
): string {
  const { data: latestBlockNumber } = useLatestBlockNumber();
  const { data: merkleInfo } = useMerkleInfo(account);

  const blockNumber = atblockNumber || latestBlockNumber;
  const { value: totalGrant } = merkleInfo?.leaf || {};
  const { proof = [] } = merkleInfo || {};
  const byteslikeProof = ethers.utils.concat(proof as string[]);

  const { data: lockingVotingPowerBN } = useSmartContractReadCall(
    lockingVaultContract,
    "queryVotePower",
    {
      callArgs: [account as string, blockNumber as number, byteslikeProof],
      enabled: !!account && !!blockNumber && !!proof,
    }
  );
  const { data: rewardsVotingPowerBN } = useSmartContractReadCall(
    rewardsContract,
    "queryVotePower",
    {
      callArgs: [account as string, totalGrant as string, byteslikeProof],
      enabled: !!account && !!blockNumber && !!totalGrant && !!proof,
    }
  );

  const lockingVotingPower = formatEther(lockingVotingPowerBN || 0);
  const rewardsVotingPower = formatEther(rewardsVotingPowerBN || 0);

  const votingPower = FixedNumber.from(lockingVotingPower)
    .addUnsafe(FixedNumber.from(rewardsVotingPower))
    .toString();

  return votingPower;
}
