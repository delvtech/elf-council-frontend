import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";
import { lockingVaultContract } from "src/elf/contracts";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";

export function useLockingVaultVotingPower(
  account: string | undefined | null,
  atBlockNumber?: number
): string {
  const { data: latestBlockNumber } = useLatestBlockNumber();
  const { data: merkleInfo } = useMerkleInfo(account);

  const blockNumber = atBlockNumber || latestBlockNumber;
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

  const lockingVotingPower = formatEther(lockingVotingPowerBN || 0);

  return lockingVotingPower;
}
