import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "@ethersproject/units";
import {
  LockingVault,
  OptimisticRewards,
  VestingVault,
} from "elf-council-typechain";
import { BytesLike } from "ethers";

import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";

/**
 * Use this to get the current vote power.
 *
 * Voting power can go stale if the current block is beyond the staleBlockLag +
 * atBlockNumber. In the case of stale voting power, this will return "0".
 */
export function useQueryVotePower(
  account: string | undefined | null,
  vaultContract: LockingVault | VestingVault | OptimisticRewards,
  atBlockNumber?: number,
  extraData?: BytesLike,
): string {
  const { data: latestBlockNumber } = useLatestBlockNumber();

  const blockNumber = atBlockNumber || latestBlockNumber;

  const { data: votePower } = useSmartContractReadCall(
    vaultContract,
    "queryVotePower",
    {
      callArgs: [
        account as string,
        blockNumber as number,
        extraData as BytesLike,
      ],
      enabled: !!account && !!blockNumber && !!extraData,
      keepPreviousData: true,
    },
  );

  return formatEther(votePower || 0);
}

/**
 * Use this to get the historical voting power.
 *
 * This does not take into account whether or not the voting power is stale.
 */
export function useQueryVotePowerView(
  account: string | undefined | null,
  vaultContract: LockingVault | VestingVault,
  atBlockNumber?: number,
): string {
  const { data: latestBlockNumber } = useLatestBlockNumber();

  const blockNumber = atBlockNumber || latestBlockNumber;

  const { data: votingPower } = useSmartContractReadCall(
    vaultContract,
    "queryVotePowerView",
    {
      callArgs: [account as string, blockNumber as number],
      enabled: !!account && !!blockNumber,
      keepPreviousData: true,
    },
  );

  return formatEther(votingPower || 0);
}
