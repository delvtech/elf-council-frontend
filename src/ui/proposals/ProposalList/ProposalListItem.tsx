import React, { ReactElement } from "react";
import { Signer } from "@ethersproject/abstract-signer";
import { Proposal } from "elf-council-proposals";
import Card from "src/ui/base/Card/Card";
import CardHeader from "src/ui/base/Card/CardHeader";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { t } from "ttag";
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
        <div className="flex space-x-4">
          <Tag intent={Intent.PRIMARY}>{t`No vote found`}</Tag>
        </div>
      </div>
      {account ? (
        <span>{t`Your voting power for this proposal: ${votePower}`}</span>
      ) : null}
      <div className="flex space-x-4">
        <StatusButton signer={signer} proposal={proposal} />
      </div>
    </Card>
  );
}
