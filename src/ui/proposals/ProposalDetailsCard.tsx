import React, { ReactElement, useCallback, useState } from "react";

import { CheckCircleIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import {
  ThumbDownIcon,
  ThumbUpIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import { Proposal } from "elf-council-proposals";
import { Signer } from "ethers";
import { commify, formatEther } from "ethers/lib/utils";
import { isNumber } from "lodash";
import { t } from "ttag";

import { BalanceWithLabel } from "src/ui/base/BalanceWithLabel/BalanceWithLabel";
import { assertNever } from "src/base/assertNever";
import { getIsVotingOpen } from "src/elf-council-proposals";
import { ETHERSCAN_TRANSACTION_DOMAIN } from "src/elf-etherscan/domain";
import { SnapshotProposal } from "src/elf-snapshot/queries/proposals";
import { VotingPower } from "src/elf/proposals/VotingPower";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import GradientCard from "src/ui/base/Card/GradientCard";
import { ProgressBar } from "src/ui/base/ProgressBar/ProgressBar";
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import {
  getProposalStatus,
  ProposalStatus,
  ProposalStatusLabels,
} from "src/ui/proposals/ProposalList/ProposalStatus";
import { useProposalExecuted } from "src/ui/proposals/useProposalExecuted";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { useVotingPowerForProposal } from "src/ui/proposals/useVotingPowerForProposal";
import { RESOURCES_URL } from "src/ui/resources";
import { Ballot } from "src/ui/voting/Ballot";
import { useBallot } from "src/ui/voting/useBallot";
import { useLastVoteTransactionForAccount } from "src/ui/voting/useLastVoteTransactionForAccount";
import { useVote } from "src/ui/voting/useVote";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { VotingBallotButton } from "src/ui/voting/VotingBallotButton";
import { ProposalStatusIcon } from "src/ui/proposals/ProposalList/ProposalStatusIcon";

const votingPowerTooltipText = t`Don't know what your voting power is?  Click on the icon to find out more.`;

interface ProposalDetailsCardProps {
  className?: string;
  account: string | null | undefined;
  signer: Signer | undefined;
  proposal: Proposal | undefined;
  proposalsBySnapshotId: Record<string, Proposal>;
  isOpen: boolean;
  onClose: () => void;
}

export function ProposalDetailsCard(
  props: ProposalDetailsCardProps,
): ReactElement | null {
  const {
    className,
    proposal,
    account,
    signer,
    proposalsBySnapshotId,
    isOpen,
    onClose,
  } = props;

  const snapshotProposal = useSnapshotProposal(
    proposal?.snapshotId,
    proposalsBySnapshotId,
  );

  const accountVotingPower = useVotingPowerForAccount(account);

  const proposalVotingPower = useVotingPowerForProposal(proposal?.proposalId);
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();

  const formattedAccountVotingPower = commify((+accountVotingPower).toFixed(4));

  const isExecuted = useProposalExecuted(proposal?.proposalId);
  const [newBallot, setCurrentBallot] = useState<Ballot>();

  const { data: currentBallot } = useBallot(account, proposal?.proposalId);
  const [ballotVotePower, ballotChoice] = currentBallot || [];

  const [isVoteTxPending, setIsVoteTxPending] = useState(false);

  const { data: voteTransacation } = useLastVoteTransactionForAccount(
    account,
    proposal?.proposalId,
  );

  const etherscanLink = `${ETHERSCAN_TRANSACTION_DOMAIN}/${voteTransacation?.hash}`;

  const { mutate: vote } = useVote(account, signer, proposal?.created, {
    onTransactionSubmitted: () => {
      setIsVoteTxPending(true);
    },
    onTransactionMined: () => setIsVoteTxPending(false),
  });

  const handleVote = useCallback(() => {
    if (!proposal || !isNumber(newBallot)) {
      return;
    }
    const { proposalId } = proposal;
    vote(proposalId, newBallot);
  }, [newBallot, proposal, vote]);

  if (!proposal) {
    return null;
  }

  const { quorum } = proposal;
  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);
  const votes = getVoteCount(proposalVotingPower);
  const proposalStatus = getProposalStatus(
    isVotingOpen,
    isExecuted,
    quorum,
    proposalVotingPower,
  );

  const submitButtonDisabled =
    !isNumber(newBallot) ||
    !account ||
    !isVotingOpen ||
    isVoteTxPending ||
    !+accountVotingPower;

  return (
    <GradientCard
      style={
        // don't scroll app behind popover, makes a double scroll bar
        { overscrollBehavior: "none" }
      }
      className={classNames(
        className,
        !isOpen && "translate-x-full",
        "z-10 top-0 right-0 fixed lg:static flex flex-1 flex-col items-start w-full lg:max-w-[48rem] overflow-scroll h-full min-h-[85vh]",
      )}
    >
      <div className="flex flex-col flex-1 w-full p-6">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 flex items-center justify-center w-12 h-12 p-0 rounded-md cursor-pointer lg:hidden hover:shadow"
        >
          <XIcon className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white shrink-0">
          {t`Proposal ${proposal.proposalId}`}
        </h1>
        <div className="flex justify-between w-full">
          <div className="flex-1 font-light text-white text-ellipsis shrink-0">
            {snapshotProposal?.title}
          </div>
          <div className="lg:-mt-6">
            {proposalStatus && (
              <div className="flex items-center justify-end w-full space-x-2 text-white">
                <div>{ProposalStatusLabels[proposalStatus]}</div>
                <ProposalStatusIcon signer={signer} proposal={proposal} />
              </div>
            )}
            {ballotVotePower?.gt(0) && isNumber(ballotChoice) && (
              <div className="flex items-center justify-end w-full text-white">
                <BallotLabel ballot={ballotChoice} />
              </div>
            )}
          </div>
        </div>

        <p className="my-3 overflow-hidden text-sm font-light text-white shrink-0">
          {t`Proposal Description:`}
        </p>

        <p className="overflow-hidden text-sm font-light text-white shrink-0 text-ellipsis">
          {truncateText(snapshotProposal?.body || "")}
        </p>

        <p className="my-3 overflow-hidden shrink-0">
          <a
            target="_blank"
            href={snapshotProposal?.link || ""}
            className="flex items-center text-sm font-light text-white"
            rel="noreferrer"
          >
            {t`View proposal`}
            <ExternalLinkIcon className="h-4 ml-2" />
          </a>
        </p>

        <p className="my-3 overflow-hidden shrink-0">
          <a
            target="_blank"
            href="https://forum.element.fi"
            className="flex items-center text-sm font-light text-white"
            rel="noreferrer"
          >
            {t`View Discussion`}
            <ExternalLinkIcon className="h-4 ml-2" />
          </a>
        </p>

        {isExecuted ? (
          <Tag className="w-full" intent={Intent.SUCCESS}>
            <span>{t`Executed`}</span>
            <CheckCircleIcon className="ml-2" height="24" />
          </Tag>
        ) : (
          <QuorumBar quorum={quorum} votes={votes} status={proposalStatus} />
        )}
        <BalanceWithLabel
          className="w-full mt-4"
          balance={formattedAccountVotingPower}
          tooltipText={votingPowerTooltipText}
          tooltipHref={RESOURCES_URL}
          label={t`Voting Power`}
        />

        <div className="flex flex-col items-end justify-end flex-1 w-full space-y-2">
          {voteTransacation && (
            <a
              target="_blank"
              href={etherscanLink}
              className="flex items-center justify-end w-full text-white"
              rel="noreferrer"
            >
              <span>{t`View on etherscan`}</span>
              <ExternalLinkIcon className="ml-2" height={18} />
            </a>
          )}
          <div className="flex justify-between w-full">
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
          <div className="flex h-full pt-1 text-green-500">
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
  // votes in X * 1e18 format, i.e. '50' = 50 Eth
  votes: string;

  // quorum in X * 1e18 format, i.e. '50' = 50 Eth
  quorum: string;
  status: ProposalStatus | undefined;
}

function QuorumBar(props: QuorumBarProps) {
  const { votes, quorum } = props;
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

function useSnapshotProposal(
  snapshotId: string | undefined,
  proposalsBySnapshotId: Record<string, Proposal>,
): SnapshotProposal | undefined {
  const { data: snapshotProposals } = useSnapshotProposals(
    Object.keys(proposalsBySnapshotId),
  );

  return snapshotProposals?.find((s) => s.id === snapshotId);
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
