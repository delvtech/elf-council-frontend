import React, { ReactElement, useCallback } from "react";

import { Signer } from "@ethersproject/abstract-signer";
import {
  ThumbDownIcon,
  ThumbUpIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import { Proposal } from "elf-council-proposals";
import { formatEther } from "ethers/lib/utils";
import { t } from "ttag";

import { formatAbbreviatedDate } from "src/base/dates";
import { MS_PER_S, SECONDS_PER_BLOCK } from "src/base/time";
import Card from "src/ui/base/Card/Card";
import CardHeader from "src/ui/base/Card/CardHeader";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { ProposalStatusIcon } from "src/ui/proposals/ProposalList/ProposalStatusIcon";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { Ballot } from "src/ui/voting/Ballot";
import { useBallot } from "src/ui/voting/useBallot";

interface ProposalListItemProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  proposal: Proposal;
  active: boolean;
  onClick: (proposalId: string | undefined) => void;
}

export function ProposalListItem({
  account,
  signer,
  proposal,
  active,
  onClick,
}: ProposalListItemProps): ReactElement {
  const { proposalId, snapshotId } = proposal;
  const { data: [snapshotProposal] = [] } = useSnapshotProposals([snapshotId]);

  const votingPeriodEndsTimestampMS =
    proposal.createdTimestamp * MS_PER_S +
    Math.round(proposal.expiration * SECONDS_PER_BLOCK * MS_PER_S);

  const votingPeriodEndsDate = formatAbbreviatedDate(
    new Date(votingPeriodEndsTimestampMS),
  );

  const handleClick = useCallback(
    () => onClick(proposalId),
    [onClick, proposalId],
  );

  return (
    <Card
      interactive
      active={active}
      onClick={handleClick}
      key={proposal.proposalId}
      className="flex items-center justify-between"
    >
      <div className="flex flex-col w-full space-y-4">
        <div className="flex flex-col justify-between">
          <CardHeader
            title={snapshotProposal?.title}
            description={t`Proposal #${proposalId}`}
          />
          <div
            className={classNames(
              "h-full items-center justify-between flex space-x-4 text-principalRoyalBlue",
            )}
          >
            <div className="text-sm">{t`voting ends ${votingPeriodEndsDate}`}</div>
            <div className="flex items-center space-x-4">
              <div className="pb-0.5">
                <BallotIcon account={account} proposalId={proposalId} />
              </div>
              <ProposalStatusIcon signer={signer} proposal={proposal} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

interface BallotIconProps {
  account: string | null | undefined;
  proposalId: string;
}
function BallotIcon({
  account,
  proposalId,
}: BallotIconProps): ReactElement | null {
  const { data: ballot } = useBallot(account, proposalId);
  if (ballot === undefined) {
    return null;
  }

  const [votingPowerBN, castBallot] = ballot;
  const votingPower = Number(formatEther(votingPowerBN || 0));

  if (votingPower && castBallot === Ballot.YES) {
    return (
      <div className="w-4 h-4 text-green-500">
        <Tooltip content={t`Voted yes`}>
          <ThumbUpIcon height="18" />
        </Tooltip>
      </div>
    );
  }

  if (votingPower && castBallot === Ballot.NO) {
    return (
      <div className="w-4 h-4 text-red-500">
        <Tooltip content={t`Voted no`}>
          <ThumbDownIcon height="18" />
        </Tooltip>
      </div>
    );
  }

  if (votingPower && castBallot === Ballot.MAYBE) {
    return (
      <div className="w-4 h-4 text-principalRoyalBlue">
        <Tooltip content={t`Voted abstain`}>
          <XCircleIcon height="18" />
        </Tooltip>
      </div>
    );
  }

  return null;
}
