import { FixedNumber } from "ethers";

import { useLockingVaultVotingPower } from "src/ui/voting/useLockingVaultVotingPower";
import { useVestingVaultVotingPower } from "src/ui/voting/useVestingVaultVotingPower";

export function useVotingPowerForAccount(
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
