import React, { ReactElement } from "react";

import { Signer } from "@ethersproject/abstract-signer";
import { Proposal } from "elf-council-proposals";
import { t } from "ttag";

import { getIsVotingOpen } from "src/elf-council-proposals";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import {
  useVotingPowerForProposal,
  VotingPower,
} from "src/ui/proposals/useVotingPowerForProposal";

enum Status {
  IN_PROGRESS = "IN_PROGRESS",
  PASSING = "PASSING",
  FAILING = "FAILING",

  PASSED = "PASSED",
  FAILED = "FAILIED",
}

const StatusLabels: Record<Status, string> = {
  [Status.IN_PROGRESS]: t`In progress`,
  [Status.PASSING]: t`Passing`,
  [Status.FAILING]: t`Failing`,
  [Status.PASSED]: t`Passed`,
  [Status.FAILED]: t`Failed`,
};

const StatusTagColors: Record<Status, Intent> = {
  [Status.IN_PROGRESS]: Intent.WARNING,
  [Status.PASSING]: Intent.SUCCESS,
  [Status.FAILING]: Intent.ERROR,
  [Status.PASSED]: Intent.SUCCESS,
  [Status.FAILED]: Intent.ERROR,
};

interface StatusButtonProps {
  signer: Signer | undefined;
  proposal: Proposal;
}
export function StatusButton({
  proposal,
}: StatusButtonProps): ReactElement | null {
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();
  const { proposalId, quorum } = proposal;
  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);
  const votingPower = useVotingPowerForProposal(proposalId);

  const status = getStatus(isVotingOpen, quorum, votingPower);

  if (!status) {
    return null;
  }

  return (
    <Tag intent={StatusTagColors[status]}>
      <div className="flex items-center space-x-8">
        <svg
          className="-ml-0.5 mr-1.5 h-3 w-3"
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx={4} cy={4} r={3} />
        </svg>
        {StatusLabels[status]}
      </div>
    </Tag>
  );
}

function getStatus(
  isVotingOpen: boolean,
  quourum: number,
  votingPower: VotingPower | undefined,
): Status | undefined {
  if (!votingPower) {
    return undefined;
  }

  // if there are enough yes votes to pass quorum
  const hasEnoughYes = votingPower[0].toNumber() >= quourum;
  // if there are enough no votes to pass quorum
  const hasEnoughNo = votingPower[1].toNumber() >= quourum;

  if (isVotingOpen) {
    if (hasEnoughYes) {
      return Status.PASSING;
    }

    if (hasEnoughNo) {
      return Status.FAILING;
    }

    return Status.IN_PROGRESS;
  }

  if (hasEnoughYes) {
    return Status.PASSED;
  }

  if (hasEnoughNo) {
    return Status.FAILED;
  }
}
