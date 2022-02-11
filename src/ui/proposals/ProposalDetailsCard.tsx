import React, { ReactElement, useCallback, useMemo, useState } from "react";

import { CheckCircleIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import {
  ThumbDownIcon,
  ThumbUpIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import { Proposal } from "elf-council-proposals";
import { Signer, ContractTransaction } from "ethers";
import { commify, formatEther } from "ethers/lib/utils";
import { isNumber } from "lodash";
import { t } from "ttag";

import { assertNever } from "src/base/assertNever";
import { getIsVotingOpen } from "src/elf-council-proposals";
import { ETHERSCAN_TRANSACTION_DOMAIN } from "src/elf-etherscan/domain";
import { VotingPower } from "src/elf/proposals/VotingPower";
import { BalanceWithLabel } from "src/ui/base/BalanceWithLabel/BalanceWithLabel";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import GradientCard from "src/ui/base/Card/GradientCard";
import { Intent } from "src/ui/base/Intent";
import { ProgressBar } from "src/ui/base/ProgressBar/ProgressBar";
import { Tag } from "src/ui/base/Tag/Tag";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import {
  getProposalStatus,
  ProposalStatus,
  ProposalStatusLabels,
} from "src/ui/proposals/ProposalList/ProposalStatus";
import { ProposalStatusIcon } from "src/ui/proposals/ProposalList/ProposalStatusIcon";
import { useProposalExecuted } from "src/ui/proposals/useProposalExecuted";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { useVotingPowerForProposal } from "src/ui/proposals/useVotingPowerForProposal";
import { Ballot } from "src/ui/voting/Ballot";
import { useBallot } from "src/ui/voting/useBallot";
import { useLastVoteTransactionForAccount } from "src/ui/voting/useLastVoteTransactionForAccount";
import { useVote } from "src/ui/voting/useVote";
import { useVotingPowerForAccountAtBlockNumber } from "src/ui/voting/useVotingPowerForAccount";
import { VotingBallotButton } from "src/ui/voting/VotingBallotButton";

const votingPowerTooltipText = t`The voting power delegated to you for this proposal`;

interface ProposalDetailsCardProps {
  className?: string;
  account: string | null | undefined;
  signer: Signer | undefined;
  proposal: Proposal;
  isOpen: boolean;
  onClose: () => void;
}

export function ProposalDetailsCard(
  props: ProposalDetailsCardProps,
): ReactElement | null {
  const { className, proposal, account, signer, isOpen, onClose } = props;
  const { proposalId, snapshotId, quorum } = proposal;

  const [newBallot, setCurrentBallot] = useState<Ballot>();
  const [isChangingVote, setIsChangingVote] = useState(false);
  const [isVoteTxPending, setIsVoteTxPending] = useState(false);
  const [newVoteTransaction, setNewVoteTransaction] =
    useState<ContractTransaction>();

  const { data: snapshotProposals } = useSnapshotProposals([snapshotId]);
  const snapshotProposal = snapshotProposals && snapshotProposals[0];

  const accountVotingPower = useVotingPowerForAccountAtBlockNumber(
    account,
    proposal.created,
  );

  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();
  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);

  const isExecuted = useProposalExecuted(proposalId);

  const { data: currentBallot } = useBallot(account, proposalId);
  const [ballotVotePower, ballotChoice] = currentBallot || [];

  const { data: lastVoteTransaction } = useLastVoteTransactionForAccount(
    account,
    proposalId,
  );

  const etherscanLink = useMemo(() => {
    const hash = newVoteTransaction?.hash || lastVoteTransaction?.hash;
    if (hash && !isChangingVote) {
      return `${ETHERSCAN_TRANSACTION_DOMAIN}/${hash}`;
    }
    return null;
  }, [isChangingVote, lastVoteTransaction, newVoteTransaction]);

  const proposalVotingResults = useVotingPowerForProposal(proposalId);
  const proposalStatus = getProposalStatus(
    isVotingOpen,
    isExecuted,
    quorum,
    proposalVotingResults,
  );

  const submitButtonDisabled =
    !isNumber(newBallot) ||
    !account ||
    !isVotingOpen ||
    isVoteTxPending ||
    !+accountVotingPower;

  const { mutate: vote } = useVote(account, signer, proposal.created, {
    onTransactionSubmitted: (pendingTransaction) => {
      setIsChangingVote(false);
      setIsVoteTxPending(true);
      setNewVoteTransaction(pendingTransaction);
    },
    onTransactionMined: () => setIsVoteTxPending(false),
  });

  const handleVote = useCallback(() => {
    if (!isNumber(newBallot)) {
      return;
    }
    setIsChangingVote(true);
    vote(proposalId, newBallot);
  }, [newBallot, proposalId, vote]);

  return (
    <GradientCard
      style={
        // don't scroll app behind popover, makes a double scroll bar
        { overscrollBehavior: "none" }
      }
      className={classNames(
        className,
        !isOpen && "translate-x-full",

        "fixed inset-0 z-10 flex h-full min-h-[85vh] w-full flex-1 flex-col items-start overflow-auto rounded-none lg:sticky lg:top-10 lg:max-w-[48rem] lg:rounded-xl",
      )}
    >
      <div className="flex w-full flex-1 flex-col p-6">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md p-0 hover:shadow lg:hidden"
        >
          <XIcon className="h-6 w-6 text-white" />
        </button>
        <h1 className="shrink-0 text-2xl font-bold text-white">
          {t`Proposal ${proposalId}`}
        </h1>
        <div className="flex w-full justify-between">
          <div className="flex-1 shrink-0 text-ellipsis font-light text-white">
            {snapshotProposal?.title}
          </div>
          <div className="lg:-mt-6">
            {proposalStatus && (
              <div className="flex w-full items-center justify-end space-x-2 text-white">
                <div>{ProposalStatusLabels[proposalStatus]}</div>
                <ProposalStatusIcon signer={signer} proposal={proposal} />
              </div>
            )}
            {ballotVotePower?.gt(0) && isNumber(ballotChoice) && (
              <div className="flex w-full items-center justify-end text-white">
                <BallotLabel ballot={ballotChoice} />
              </div>
            )}
          </div>
        </div>

        <p className="my-3 shrink-0 overflow-hidden text-sm font-light text-white">
          {t`Proposal Description:`}
        </p>

        <p className="shrink-0 overflow-hidden text-ellipsis text-sm font-light text-white">
          {truncateText(snapshotProposal?.body || "")}
        </p>

        <p className="my-3 shrink-0 overflow-hidden">
          <a
            target="_blank"
            href={snapshotProposal?.link || ""}
            className="flex items-center text-sm font-light text-white"
            rel="noreferrer"
          >
            {t`View proposal`}
            <ExternalLinkIcon className="ml-2 h-4" />
          </a>
        </p>

        <p className="my-3 shrink-0 overflow-hidden">
          <a
            target="_blank"
            href="https://forum.element.fi"
            className="flex items-center text-sm font-light text-white"
            rel="noreferrer"
          >
            {t`View Discussion`}
            <ExternalLinkIcon className="ml-2 h-4" />
          </a>
        </p>

        {isExecuted ? (
          <Tag className="w-full" intent={Intent.SUCCESS}>
            <span>{t`Executed`}</span>
            <CheckCircleIcon className="ml-2" height="24" />
          </Tag>
        ) : (
          <QuorumBar
            quorum={quorum}
            proposalId={proposalId}
            status={proposalStatus}
          />
        )}
        <BalanceWithLabel
          className="mt-4 w-full"
          balance={accountVotingPower}
          tooltipText={votingPowerTooltipText}
          label={t`Voting Power`}
        />

        <div className="flex w-full flex-1 flex-col items-end justify-end space-y-2">
          {etherscanLink && (
            <a
              target="_blank"
              href={etherscanLink}
              className="flex w-full items-center justify-end text-white"
              rel="noreferrer"
            >
              <span>{t`View on etherscan`}</span>
              <ExternalLinkIcon className="ml-2" height={18} />
            </a>
          )}
          <div className="flex w-full justify-between">
            <VotingBallotButton
              proposal={proposal}
              currentBallot={newBallot}
              onSelectBallot={setCurrentBallot}
            />
            <Button
              disabled={submitButtonDisabled}
              onClick={handleVote}
              loading={isVoteTxPending}
              variant={ButtonVariant.WHITE}
            >
              {isNumber(currentBallot) ? t`Modify vote` : t`Submit`}
            </Button>
          </div>
        </div>
      </div>
    </GradientCard>
  );
}

interface BallotLabelProps {
  ballot: Ballot;
}
function BallotLabel({ ballot }: BallotLabelProps): ReactElement | null {
  switch (ballot) {
    case Ballot.YES:
      return (
        <div className="flex items-center space-x-2">
          <div>{t`Voted yes`}</div>
          <div className="flex h-full pb-1 text-green-500">
            <ThumbUpIcon height="18" />
          </div>
        </div>
      );
    case Ballot.NO:
      return (
        <div className="flex items-center space-x-2">
          <div>{t`Voted no`}</div>
          <div className="flex h-full pt-1 text-red-500">
            <ThumbDownIcon height="18" />
          </div>
        </div>
      );
    case Ballot.MAYBE:
      return (
        <div className="flex items-center space-x-2">
          <div>{t`Voted abstain`}</div>
          <div className="flex h-full text-white">
            <XCircleIcon height="18" />
          </div>
        </div>
      );
    default:
      assertNever(ballot);
      return null;
  }
}

interface QuorumBarProps {
  proposalId: string;

  // quorum in X * 1e18 format, i.e. '50' = 50 Eth
  quorum: string;
  status: ProposalStatus | undefined;
}

function QuorumBar(props: QuorumBarProps) {
  const { proposalId, quorum } = props;
  const proposalVotingResults = useVotingPowerForProposal(proposalId);
  const votes = getVoteCount(proposalVotingResults);

  const quorumPercent = Math.floor((+votes / +quorum) * 100);
  return (
    <div className="w-full space-y-1 text-sm text-white">
      <div>
        {votes} {t`total votes`}
      </div>
      <ProgressBar progress={+votes / +quorum} />
      <div>
        {`${quorumPercent}%`} {t`quorum reached`}
      </div>
      <div className="text-xs">
        {commify(quorum)} {t`(vote quorum)`}
      </div>
    </div>
  );
}

const CHARACTER_LIMIT = 750;
function truncateText(text: string, characterLimit = CHARACTER_LIMIT) {
  if (text.length <= characterLimit) {
    return text;
  }

  return `${text.slice(0, CHARACTER_LIMIT)}...`;
}

function getVoteCount(votingPower: VotingPower | undefined): string {
  if (!votingPower) {
    return "0";
  }

  return votingPower[0].gt(votingPower[1])
    ? formatEther(votingPower[0])
    : formatEther(votingPower[1]);
}
