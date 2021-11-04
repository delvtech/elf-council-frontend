import { Signer } from "@ethersproject/abstract-signer";
import { Proposal } from "elf-council-proposals";
import React, { ReactElement, useCallback } from "react";
import {
  getIsExecutable,
  getIsVotingOpen,
  proposalsBySnapShotId,
} from "src/elf-council-proposals";
import { SnapshotProposal } from "src/elf-snapshot/queries/proposals";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card from "src/ui/base/Card/Card";
import CardHeader from "src/ui/base/Card/CardHeader";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { useExecute } from "src/ui/proposals/useExecute";
import { Ballot } from "src/ui/voting/Ballot";
import { useVote } from "src/ui/voting/useVote";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { t } from "ttag";

interface ProposalListProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  snapshotProposals: SnapshotProposal[];
  activeProposalId: string | undefined;
  setActiveProposal: (proposalId: string | undefined) => void;
}
export function ProposalList({
  account,
  snapshotProposals,
  signer,
  activeProposalId,
  setActiveProposal,
}: ProposalListProps): ReactElement {
  return (
    <div className={tw("flex", "w-full", "flex-col", "space-y-4", "pb-8")}>
      {snapshotProposals.map((snapshotProposal) => (
        <ProposalCardRow
          key={snapshotProposal.id}
          active={
            proposalsBySnapShotId[snapshotProposal.id].proposalId ===
            activeProposalId
          }
          snapshotProposal={snapshotProposal}
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
  snapshotProposal: SnapshotProposal;
  active: boolean;
  setActiveProposal: (proposalId: string | undefined) => void;
}
function ProposalCardRow({
  account,
  signer,
  snapshotProposal,
  active,
  setActiveProposal,
}: ProposalCardRowProps): ReactElement {
  const proposal = proposalsBySnapShotId[snapshotProposal.id];
  const { proposalId: onChainProposalId, created: proposalCreatedBlockNumber } =
    proposal;

  const { mutate: vote } = useVote(account, signer, proposalCreatedBlockNumber);
  const votePower = useVotingPowerForAccount(
    account,
    proposalCreatedBlockNumber
  );
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();

  const onYesVoteClick = useCallback(() => {
    vote(onChainProposalId.toString(), Ballot.YES);
  }, [onChainProposalId, vote]);
  const onNoVoteClick = useCallback(() => {
    vote(onChainProposalId.toString(), Ballot.NO);
  }, [onChainProposalId, vote]);
  const onMaybeVoteClick = useCallback(() => {
    vote(onChainProposalId.toString(), Ballot.MAYBE);
  }, [onChainProposalId, vote]);

  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);

  return (
    <Card
      interactive
      active={active}
      onClick={() => {
        return setActiveProposal(proposal.proposalId);
      }}
      key={snapshotProposal.id}
      className={tw("flex", "justify-between", "items-center")}
    >
      <div className={tw("flex-col", "space-y-4")}>
        <CardHeader
          title={snapshotProposal.title}
          description={t`Proposal #${
            proposalsBySnapShotId[snapshotProposal.id].proposalId
          }`}
        />
        {/* <div className={tw("flex", "space-x-4")}>
          <AnchorButton
            variant={ButtonVariant.PRIMARY}
            href={snapshotProposal.link}
          >{t`View Proposal`}</AnchorButton>
          <Button variant={ButtonVariant.PRIMARY}>{t`Discuss`}</Button>
        </div> */}
      </div>
      {account ? (
        <span>{t`Your voting power for this proposal: ${votePower}`}</span>
      ) : null}
      <div className={tw("flex", "space-x-4")}>
        {/* {isVotingOpen ? (
          <PopoverButton
            disabled={!account}
            variant={ButtonVariant.GRADIENT}
            popover={
              <Card variant={CardVariant.BLUE}>
                <div className={tw("flex", "flex-col")}>
                  <Button onClick={onYesVoteClick}>{t`yes`}</Button>
                  <Button onClick={onNoVoteClick}>{t`no`}</Button>
                  <Button onClick={onMaybeVoteClick}>{t`maybe`}</Button>
                </div>
              </Card>
            }
          >
            <span>{t`Vote`}</span>
            <ChevronLeft
              className={tw(
                // transform is weird, it exists in the tailwind css, but
                // requires casting when using "tw()" :shrug:
                "transform" as TTailwindString,
                "-rotate-90"
              )}
            />
          </PopoverButton>
        ) : null} */}

        <StatusButton signer={signer} proposal={proposal} />
      </div>
    </Card>
  );
}
interface StatusButtonProps {
  signer: Signer | undefined;
  proposal: Proposal;
}
function StatusButton({
  proposal,
  signer,
}: StatusButtonProps): ReactElement | null {
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();
  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);
  const isExecutable = getIsExecutable(proposal, currentBlockNumber);
  const { mutate: execute } = useExecute(signer);
  const onExecuteClick = useCallback(() => {
    execute(proposal.proposalId);
  }, [execute, proposal.proposalId]);

  if (isExecutable) {
    return (
      <Button onClick={onExecuteClick} variant={ButtonVariant.OUTLINE_BLUE}>
        <div className={tw("flex", "space-x-8", "items-center")}>
          {t`Execute`}
        </div>
      </Button>
    );
  }

  if (isVotingOpen) {
    return (
      <Tag intent={Intent.SUCCESS}>
        <div className={tw("flex", "space-x-8", "items-center")}>
          <svg
            className="-ml-0.5 mr-1.5 h-3 w-3 text-statusGreen"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg>
          {t`Open for Voting`}
        </div>
      </Tag>
    );
  }
  return null;
}
