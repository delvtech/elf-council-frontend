import { FixedNumber } from "ethers";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";

import { useLockingVaultVotingPower } from "src/ui/voting/useLockingVaultVotingPower";
import { useVestingVaultVotingPower } from "src/ui/voting/useVestingVaultVotingPower";

export function useVotingPowerForAccountAtLatestBlock(
  account: string | undefined | null,
): string {
  const { data: latestBlockNumber } = useLatestBlockNumber();
  return useVotingPowerForAccount(account, latestBlockNumber);
}

/**
 * Useful for looking up vote power available for a proposal, where
 * atBlockNumber is when the proposal was created.
 */
export function useVotingPowerForAccountAtBlockNumber(
  account: string | undefined | null,
  atBlockNumber: number,
): string {
  return useVotingPowerForAccount(account, atBlockNumber);
}

function useVotingPowerForAccount(
  account: string | undefined | null,
  atBlockNumber?: number,
): string {
  const vestingVaultPower = useVestingVaultVotingPower(account, atBlockNumber);
  const lockingVotingPower = useLockingVaultVotingPower(account, atBlockNumber);

  const votingPower = FixedNumber.from(lockingVotingPower)
    .addUnsafe(FixedNumber.from(vestingVaultPower || "0"))
    .toString();

  return votingPower;
}
