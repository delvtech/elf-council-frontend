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

enum ProposalStatus {
  IN_PROGRESS = "IN_PROGRESS",
  PASSING = "PASSING",
  FAILING = "FAILING",

  PASSED = "PASSED",
  FAILED = "FAILIED",
}

const StatusLabels: Record<ProposalStatus, string> = {
  [ProposalStatus.IN_PROGRESS]: t`In progress`,
  [ProposalStatus.PASSING]: t`Passing`,
  [ProposalStatus.FAILING]: t`Failing`,
  [ProposalStatus.PASSED]: t`Passed`,
  [ProposalStatus.FAILED]: t`Failed`,
};

const StatusTagColors: Record<ProposalStatus, Intent> = {
  [ProposalStatus.IN_PROGRESS]: Intent.WARNING,
  [ProposalStatus.PASSING]: Intent.SUCCESS,
  [ProposalStatus.FAILING]: Intent.ERROR,
  [ProposalStatus.PASSED]: Intent.SUCCESS,
  [ProposalStatus.FAILED]: Intent.ERROR,
};

interface ProposalStatusTagProps {
  signer: Signer | undefined;
  proposal: Proposal;
}

export function ProposalStatusTag({
  proposal,
}: ProposalStatusTagProps): ReactElement | null {
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
): ProposalStatus | undefined {
  if (!votingPower) {
    return undefined;
  }

  // if there are enough yes votes to pass quorum
  const hasEnoughYes = votingPower[0].toNumber() >= quourum;
  // if there are enough no votes to pass quorum
  const hasEnoughNo = votingPower[1].toNumber() >= quourum;

  if (isVotingOpen) {
    if (hasEnoughYes) {
      return ProposalStatus.PASSING;
    }

    if (hasEnoughNo) {
      return ProposalStatus.FAILING;
    }

    return ProposalStatus.IN_PROGRESS;
  }

  if (hasEnoughYes) {
    return ProposalStatus.PASSED;
  }

  if (hasEnoughNo) {
    return ProposalStatus.FAILED;
  }
}
