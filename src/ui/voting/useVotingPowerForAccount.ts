import { rewardsContract, nonFungibleVotingContract } from "src/elf/contracts";
import { FixedNumber } from "ethers";
import { useLockingVaultVotingPower } from "src/ui/voting/useLockingVaultVotingPower";
import { useRewardsVaultVotingPower } from "src/ui/voting/useRewardsVaultVotingPower";

export function useVotingPowerForAccount(
  account: string | undefined | null,
  atBlockNumber?: number
): string {
  // The CoreVoting contract passes this parameter to the rewards contract when querying vote power,
  // so we have to pass it as well, though the rewards contract doesn't need this to calculate vote
  // power.
  const rewardsVotingPower = useRewardsVaultVotingPower(
    account,
    rewardsContract,
    atBlockNumber
  );
  const nonFungibleVotingPower = useRewardsVaultVotingPower(
    account,
    nonFungibleVotingContract,
    atBlockNumber
  );

  const lockingVotingPower = useLockingVaultVotingPower(account, atBlockNumber);

  const votingPower = FixedNumber.from(lockingVotingPower)
    .addUnsafe(FixedNumber.from(rewardsVotingPower))
    .toString();

  return votingPower;
}
