import { Proposal } from "elf-council-proposals";
import { parseEther } from "ethers/lib/utils";
import { ReactElement } from "react";
import { Intent } from "src/ui/base/Intent";
import { Tag } from "src/ui/base/Tag/Tag";
import {
  useLockingVaultVotingPower,
  useLockingVaultVotingPowerView,
} from "src/ui/voting/useLockingVaultVotingPower";
import {
  useVestingVaultVotingPower,
  useVestingVaultVotingPowerView,
} from "src/ui/voting/useVestingVaultVotingPower";
import { t } from "ttag";

interface StaleVotingPowerMessageProps {
  account: string | null | undefined;
  proposal: Proposal;
}

export function StaleVotingPowerMessage({
  account,
  proposal,
}: StaleVotingPowerMessageProps): ReactElement | null {
  const lockingVaultVotePower = useLockingVaultVotingPower(
    account,
    proposal.created,
  );
  const historicalLockingVaultVotePower = useLockingVaultVotingPowerView(
    account,
    proposal.created,
  );
  const isLockingVaultVotingPowerStale =
    parseEther(historicalLockingVaultVotePower).gt(0) &&
    historicalLockingVaultVotePower !== lockingVaultVotePower;

  const vestingVaultVotePower = useVestingVaultVotingPower(
    account,
    proposal.created,
  );
  const historicalVestingVaultVotePower = useVestingVaultVotingPowerView(
    account,
    proposal.created,
  );
  const isVestingVaultVotingPowerStale =
    parseEther(historicalVestingVaultVotePower).gt(0) &&
    historicalVestingVaultVotePower !== vestingVaultVotePower;

  const isVotingPowerStale =
    isLockingVaultVotingPowerStale && isVestingVaultVotingPowerStale;

  if (isVotingPowerStale) {
    return (
      <Tag
        intent={Intent.ERROR}
      >{t`Your voting power has expired for this proposal.`}</Tag>
    );
  }

  return null;
}
