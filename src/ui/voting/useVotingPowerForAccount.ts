import { FixedNumber } from "ethers";

import { useLockingVaultVotingPower } from "src/ui/voting/useLockingVaultVotingPower";
import { useVestingVaultVotingPower } from "src/ui/voting/useVestingVaultVotingPower";

export function useVotingPowerForAccount(
  account: string | undefined | null,
  atBlockNumber?: number,
): string {
  // NOTE: the following are commented out but we'll need to add them in soon.
  // The CoreVoting contract passes this parameter to the rewards contract when querying vote power,
  // so we have to pass it as well, though the rewards contract doesn't need this to calculate vote
  // power.
  // const rewardsVotingPower = useRewardsVaultVotingPower(
  //   account,
  //   rewardsContract,
  //   atBlockNumber,
  // );

  // const nonFungibleVotingPower = useRewardsVaultVotingPower(
  //   account,
  //   nonFungibleVotingContract,
  //   atBlockNumber,
  // );

  const vestingVaultPower = useVestingVaultVotingPower(account, atBlockNumber);
  const lockingVotingPower = useLockingVaultVotingPower(account, atBlockNumber);

  const votingPower = FixedNumber.from(lockingVotingPower)
    .addUnsafe(FixedNumber.from(vestingVaultPower || "0"))
    // .addUnsafe(FixedNumber.from(rewardsVotingPower))
    // .addUnsafe(FixedNumber.from(nonFungibleVotingPower))
    .toString();

  return votingPower;
}
