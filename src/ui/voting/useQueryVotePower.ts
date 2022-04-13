import { useWeb3React } from "@web3-react/core";
import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "@ethersproject/units";
import {
  LockingVault,
  OptimisticRewards,
  VestingVault,
} from "@elementfi/elf-council-typechain";
import { BigNumber, BytesLike, ethers } from "ethers";

import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { useQuery } from "react-query";
import { Logger } from "ethers/lib/utils";

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

  // TODO: use useSmartContractReadCall when onError is overridable
  const { data: votePower } = useQuery({
    queryFn: async () => {
      let votePower = BigNumber.from(0);
      try {
        // TODO: find a better solution for this.
        // ethers.js will spit out an error message that we can't disable without turning off the
        // logger.  because the smart contract code for queryVotePower returns an error if the
        // account is not found, it can flood the console with errors.  this is a workaround until a
        // better solution is found.
        ethers.utils.Logger.setLogLevel(Logger.levels.OFF);
        votePower = await vaultContract.callStatic.queryVotePower(
          account as string,
          blockNumber as number,
          extraData as BytesLike,
        );
      } catch (error) {
        //
      } finally {
        ethers.utils.Logger.setLogLevel(Logger.levels.INFO);
      }

      return votePower;
    },
    queryKey: ["queryVotePower", account, atBlockNumber],
    enabled: !!account && !!blockNumber && !!extraData,
    keepPreviousData: true,
  });

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
