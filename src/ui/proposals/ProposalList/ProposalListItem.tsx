import React, { ReactElement } from "react";

import { Signer } from "@ethersproject/abstract-signer";
import classNames from "classnames";
import { Proposal } from "elf-council-proposals";
import { t } from "ttag";

import Card from "src/ui/base/Card/Card";
import CardHeader from "src/ui/base/Card/CardHeader";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { Ballot, useVoted } from "src/ui/voting/useVoted";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";

import { StatusButton } from "./StatusButton";

interface ProposalListItemProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  proposal: Proposal;
  active: boolean;
  setActiveProposal: (proposalId: string | undefined) => void;
}
export function ProposalListItem({
  account,
  signer,
  proposal,
  active,
  setActiveProposal,
}: ProposalListItemProps): ReactElement {
  const {
    proposalId,
    created: proposalCreatedBlockNumber,
    snapshotId,
  } = proposal;

  const { data: [snapshotProposal] = [] } = useSnapshotProposals([snapshotId]);

  const votePower = useVotingPowerForAccount(
    account,
    proposalCreatedBlockNumber,
  );

  const votedLabel = useVotedLabel(account, proposalId);

  return (
    <Card
      interactive
      active={active}
      onClick={() => {
        return setActiveProposal(proposalId);
      }}
      key={proposal.proposalId}
      className="flex items-center justify-between"
    >
      <div className="flex-col space-y-4">
        <CardHeader
          title={snapshotProposal?.title}
          description={t`Proposal #${proposalId}`}
        />
        <div
          className={classNames("flex space-x-4", {
            [classNames("invisible")]: !votedLabel,
          })}
        >
          <Tag intent={Intent.PRIMARY_SOLID}>{votedLabel ?? "Voted YES"}</Tag>
        </div>
      </div>
      {account ? (
        <span>{t`Your voting power for this proposal: ${votePower}`}</span>
      ) : null}
      <div className="flex items-end h-full space-x-4">
        <StatusButton signer={signer} proposal={proposal} />
      </div>
    </Card>
  );
}

function useVotedLabel(
  account: string | null | undefined,
  proposalId: string,
): string | undefined {
  const { data: voted } = useVoted(account, proposalId);

  if (voted?.caseBallot === Ballot.YES) {
    return t`Voted YES`;
  }

  if (voted?.caseBallot === Ballot.NO) {
    return t`Voted NO`;
  }
}
