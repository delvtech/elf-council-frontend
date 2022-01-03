import React, { ReactElement } from "react";

import { Signer } from "@ethersproject/abstract-signer";
import { Proposal } from "elf-council-proposals";
import { t } from "ttag";

import { getIsVotingOpen } from "src/elf-council-proposals";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { useVotingPowerForProposal } from "src/ui/proposals/useVotingPowerForProposal";

import { getProposalStatus, ProposalStatus } from "./ProposalStatus";

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

  const status = getProposalStatus(isVotingOpen, quorum, votingPower);

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
