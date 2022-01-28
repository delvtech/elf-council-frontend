import React, { ReactElement } from "react";

import { Signer } from "@ethersproject/abstract-signer";
import { Proposal } from "elf-council-proposals";
import { t } from "ttag";

import { getIsVotingOpen } from "src/elf-council-proposals";
import { Intent } from "src/ui/base/Intent";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { useVotingPowerForProposal } from "src/ui/proposals/useVotingPowerForProposal";

import { getProposalStatus, ProposalStatus } from "./ProposalStatus";
import { useProposalExecuted } from "src/ui/proposals/useProposalExecuted";
import classNames from "classnames";
import Tooltip from "src/ui/base/Tooltip/Tooltip";

const StatusLabels: Record<ProposalStatus, string> = {
  [ProposalStatus.IN_PROGRESS]: t`In progress`,
  [ProposalStatus.PASSING]: t`Passing`,
  [ProposalStatus.FAILING]: t`Failing`,
  [ProposalStatus.PASSED]: t`Passed`,
  [ProposalStatus.FAILED]: t`Failed`,
};

const StatusTagIntents: Record<ProposalStatus, Intent> = {
  [ProposalStatus.IN_PROGRESS]: Intent.WARNING,
  [ProposalStatus.PASSING]: Intent.SUCCESS,
  [ProposalStatus.FAILING]: Intent.ERROR,
  [ProposalStatus.PASSED]: Intent.SUCCESS,
  [ProposalStatus.FAILED]: Intent.ERROR,
};

interface ProposalStatusIconProps {
  signer: Signer | undefined;
  proposal: Proposal;
}

export function ProposalStatusIcon({
  proposal,
}: ProposalStatusIconProps): ReactElement | null {
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();
  const { proposalId, quorum } = proposal;
  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);
  const isExecuted = useProposalExecuted(proposalId);
  const votingPower = useVotingPowerForProposal(proposalId);

  const status = getProposalStatus(
    isVotingOpen,
    isExecuted,
    quorum,
    votingPower,
  );

  if (!status) {
    return null;
  }

  return (
    <Tooltip content={StatusLabels[status]}>
      <div
        className={classNames(
          "flex items-center space-x-8",
          intentTextColors[StatusTagIntents[status]],
        )}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 8 8">
          <circle cx={4} cy={4} r={3} />
        </svg>
      </div>
    </Tooltip>
  );
}

const intentTextColors: Record<Intent, string> = {
  [Intent.WARNING]: classNames("text-orange"),
  [Intent.PRIMARY]: classNames("text-principalRoyalBlue"),
  [Intent.PRIMARY_SOLID]: classNames("text-white"),
  [Intent.SUCCESS]: classNames("text-green-500"),
  [Intent.ERROR]: classNames("text-red-500"),
  [Intent.BLANK]: classNames("text-principalRoyalBlue"),
};
