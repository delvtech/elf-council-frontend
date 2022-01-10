import React, { ReactElement, useCallback } from "react";

import { Signer } from "@ethersproject/abstract-signer";
import classNames from "classnames";
import { Proposal } from "elf-council-proposals";
import { formatEther } from "ethers/lib/utils";
import { t } from "ttag";

import { formatAbbreviatedDate } from "src/base/dates";
import { MS_PER_S, SECONDS_PER_BLOCK } from "src/base/time";
import Card from "src/ui/base/Card/Card";
import CardHeader from "src/ui/base/Card/CardHeader";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import { ProposalStatusTag } from "src/ui/proposals/ProposalList/ProposalStatusTag";
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
  const ballotLabel = useBallotLabel(account, proposalId);

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
      <div className="flex-col space-y-4">
        <CardHeader
          title={snapshotProposal?.title}
          description={t`Proposal #${proposalId}`}
        />
        <div className={classNames("flex space-x-4")}>
          <Tag
            intent={active ? Intent.BLANK : Intent.PRIMARY}
          >{t`created ${formatAbbreviatedDate(
            new Date(Number(proposal.createdTimestamp) * MS_PER_S),
          )}`}</Tag>
          <Tag
            intent={active ? Intent.BLANK : Intent.PRIMARY}
          >{t`voting ends ${votingPeriodEndsDate}`}</Tag>
        </div>
      </div>
      <div className="flex items-end h-full space-x-4">
        {ballotLabel && (
          <Tag intent={active ? Intent.BLANK : Intent.PRIMARY}>
            {ballotLabel}
          </Tag>
        )}
        <ProposalStatusTag signer={signer} proposal={proposal} />
      </div>
    </Card>
  );
}

function useBallotLabel(
  account: string | null | undefined,
  proposalId: string,
): string | undefined {
  const { data: ballot } = useBallot(account, proposalId);
  if (ballot === undefined) {
    return;
  }

  const [votingPowerBN, castBallot] = ballot;
  const votingPower = Number(formatEther(votingPowerBN || 0));

  if (votingPower && castBallot === Ballot.YES) {
    return t`Voted YES`;
  }

  if (votingPower && castBallot === Ballot.NO) {
    return t`Voted NO`;
  }

  if (votingPower && castBallot === Ballot.MAYBE) {
    return t`Voted ABSTAIN`;
  }
}
