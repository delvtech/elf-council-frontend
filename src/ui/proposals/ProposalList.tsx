import React, { ReactElement } from "react";

import { Signer } from "@ethersproject/abstract-signer";
import { Proposal } from "elf-council-proposals";
import { getIsVotingOpen } from "src/elf-council-proposals";
import tw, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  padding,
  space,
  width,
} from "src/elf-tailwindcss-classnames";
import Card from "src/ui/base/Card/Card";
import CardHeader from "src/ui/base/Card/CardHeader";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { t } from "ttag";

interface ProposalListProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  proposals: Proposal[];
  activeProposalId: string | undefined;
  setActiveProposal: (proposalId: string | undefined) => void;
}
export function ProposalList({
  account,
  proposals,
  signer,
  activeProposalId,
  setActiveProposal,
}: ProposalListProps): ReactElement {
  return (
    <div
      className={tw(
        display("flex"),
        width("w-full"),
        flexDirection("flex-col"),
        space("space-y-4"),
        padding("pb-8"),
      )}
    >
      {proposals.map((proposal) => (
        <ProposalCardRow
          key={proposal.proposalId}
          active={proposal.proposalId === activeProposalId}
          proposal={proposal}
          setActiveProposal={setActiveProposal}
          account={account}
          signer={signer}
        />
      ))}
    </div>
  );
}
interface ProposalCardRowProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  proposal: Proposal;
  active: boolean;
  setActiveProposal: (proposalId: string | undefined) => void;
}
function ProposalCardRow({
  account,
  signer,
  proposal,
  active,
  setActiveProposal,
}: ProposalCardRowProps): ReactElement {
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
      className={tw(
        display("flex"),
        justifyContent("justify-between"),
        alignItems("items-center"),
      )}
    >
      <div className={tw(flexDirection("flex-col"), space("space-y-4"))}>
        <CardHeader
          title={snapshotProposal?.title}
          description={t`Proposal #${proposalId}`}
        />
        <div className={tw(display("flex"), space("space-x-4"))}>
          <Tag intent={Intent.PRIMARY}>{t`No vote found`}</Tag>
        </div>
      </div>
      {account ? (
        <span>{t`Your voting power for this proposal: ${votePower}`}</span>
      ) : null}
      <div className={tw(display("flex"), space("space-x-4"))}>
        <StatusButton signer={signer} proposal={proposal} />
      </div>
    </Card>
  );
}
interface StatusButtonProps {
  signer: Signer | undefined;
  proposal: Proposal;
}
function StatusButton({ proposal }: StatusButtonProps): ReactElement | null {
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();
  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);
  if (isVotingOpen) {
    return (
      <Tag intent={Intent.ERROR}>
        <div
          className={tw(
            display("flex"),
            space("space-x-8"),
            alignItems("items-center"),
          )}
        >
          <svg
            className="-ml-0.5 mr-1.5 h-3 w-3"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg>
          {t`Failing`}
        </div>
      </Tag>
    );
  }
  return null;
}
