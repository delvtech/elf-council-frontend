import React, { ReactElement, useCallback, useState } from "react";

import { CheckCircleIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import { InformationCircleIcon, XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { Proposal } from "elf-council-proposals";
import { Signer } from "ethers";
import { commify, formatEther } from "ethers/lib/utils";
import { isNumber } from "lodash";
import { t } from "ttag";

import { assertNever } from "src/base/assertNever";
import { getIsVotingOpen } from "src/elf-council-proposals";
import { ETHERSCAN_TRANSACTION_DOMAIN } from "src/elf-etherscan/domain";
import { SnapshotProposal } from "src/elf-snapshot/queries/proposals";
import { VotingPower } from "src/elf/proposals/VotingPower";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import GradientCard from "src/ui/base/Card/GradientCard";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { ProgressBar } from "src/ui/base/ProgressBar/ProgressBar";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import {
  getProposalStatus,
  ProposalStatus,
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
import { queryClient } from "src/elf/queryClient";
import { makeSmartContractReadCallQueryKey } from "@elementfi/react-query-typechain";
import { coreVotingContract } from "src/elf/contracts";
import { useIsTailwindSmallScreen } from "src/ui/base/tailwindBreakpoints";

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

  const isSmallScreen = useIsTailwindSmallScreen();

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
    onTransactionMined: () => {
      setIsVoteTxPending(false);

      // Refetch the voting power for this proposal
      queryClient.invalidateQueries(
        makeSmartContractReadCallQueryKey(
          coreVotingContract.address,
          "getProposalVotingPower",
          [proposal?.proposalId],
        ),
      );
    },
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
      className={classNames(
        className,
        isSmallScreen && "!rounded-none",
        !isOpen && "translate-x-full",
        "z-10 top-0 right-0 fixed md:sticky md:top-10 flex flex-col items-start w-full md:w-80 p-6 justify-center h-full md:min-h-[85vh]",
      )}
    >
      <button
        onClick={onClose}
        className="absolute top-0 right-0 flex items-center justify-center w-12 h-12 p-0 rounded-md cursor-pointer md:hidden hover:shadow"
      >
        <XIcon className="w-6 h-6 text-white" />
      </button>
      <h1 className="text-2xl font-bold text-white">
        {t`Proposal ${proposal.proposalId}`}
      </h1>

      <p className="font-light text-white">{snapshotProposal?.title}</p>

      <p className="my-3 overflow-hidden text-sm font-light text-white shrink-0">
        {t`Proposal Description:`}
      </p>

      <p className="overflow-hidden text-sm font-light text-white text-ellipsis">
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
        {ballotVotePower?.gt(0) && isNumber(ballotChoice) && (
          <div className="flex items-center justify-end w-full text-white">
            <span>{getBallotLabel(ballotChoice)}</span>
            <CheckCircleIcon className="ml-2" height={18} />
          </div>
        )}
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
    </GradientCard>
  );
}

function getBallotLabel(ballot: Ballot): string {
  switch (ballot) {
    case Ballot.YES:
      return t`Voted Yes`;
    case Ballot.NO:
      return t`Voted No`;
    case Ballot.MAYBE:
      return t`Voted Abstain`;
    default:
      assertNever(ballot);
      return "";
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

const CHARACTER_LIMIT = 250;
function truncateText(text: string, characterLimit = CHARACTER_LIMIT) {
  if (text.length <= characterLimit) {
    return text;
  }

  return `${text.slice(0, CHARACTER_LIMIT)}...`;
}

interface BalanceWithLabelProps {
  className?: string;
  balance: string;
  label: string;
  tooltipText?: string;
  tooltipHref?: string;
}

function BalanceWithLabel(props: BalanceWithLabelProps) {
  const { className, balance, label, tooltipHref, tooltipText } = props;
  return (
    <div className={classNames(className, "text-white")}>
      <div className="flex items-center">
        <div className="text-2xl font-extralight">{balance}</div>
        <ElementIcon className="ml-2" size={IconSize.MEDIUM} />
      </div>
      <div className="flex items-center text-lg font-light">
        {label}
        {tooltipText && (
          <Tooltip content={tooltipText} className="ml-1">
            {tooltipHref ? (
              <a href={tooltipHref}>
                <InformationCircleIcon className="h-4" />
              </a>
            ) : (
              <InformationCircleIcon className="h-4" />
            )}
          </Tooltip>
        )}
      </div>
    </div>
  );
}

function getVoteCount(votingPower: VotingPower | undefined): string {
  if (!votingPower) {
    return "0";
  }

  return votingPower[0].gt(votingPower[1])
    ? formatEther(votingPower[0])
    : formatEther(votingPower[1]);
}
