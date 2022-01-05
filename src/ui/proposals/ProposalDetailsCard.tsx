import React, { ReactElement } from "react";

import { ExternalLinkIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { Proposal } from "elf-council-proposals";
import { commify } from "ethers/lib/utils";
import { t } from "ttag";

import {
  getIsVotingOpen,
  proposalsBySnapShotId,
} from "src/elf-council-proposals";
import { SnapshotProposal } from "src/elf-snapshot/queries/proposals";
import Button from "src/ui/base/Button/Button";
import PopoverButton from "src/ui/base/Button/PopoverButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import GradientCard from "src/ui/base/Card/GradientCard";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { ProgressBar } from "src/ui/base/ProgressBar/ProgressBar";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import {
  getProposalStatus,
  ProposalStatus,
} from "src/ui/proposals/ProposalList/ProposalStatus";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { useVotingPowerForProposal } from "src/ui/proposals/useVotingPowerForProposal";
import { VotingPower } from "src/elf/proposals/VotingPower";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";

const votingBalanceTooltipText = t`Don't know what your voting balance is?  Click on the icon to find out more.`;
const votingPowerTooltipText = t`Don't know what your voting power is?  Click on the icon to find out more.`;

interface ProposalDetailsCardProps {
  className?: string;
  account: string | null | undefined;
  proposal: Proposal | undefined;
}

export function ProposalDetailsCard(
  props: ProposalDetailsCardProps,
): ReactElement {
  const { className, proposal, account } = props;

  const snapshotProposal = useSnapshotProposal(proposal?.snapshotId);

  const amountDeposited = useDeposited(account) || "0";

  const accountVotingPower = useVotingPowerForAccount(account);

  const proposalVotingPower = useVotingPowerForProposal(proposal?.proposalId);
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();

  const formattedAccountVotingPower = commify((+accountVotingPower).toFixed(4));

  if (!proposal) {
    return (
      <GradientCard
        style={
          // hack for now, need to fix <body> height
          { height: "85vh" }
        }
        className={classNames(
          "flex w-80 h-full p-6 justify-center items-center",
          className,
        )}
      >
        <span className="text-2xl font-bold text-center text-white">
          {t`Click on a proposal to learn more about it here.`}
        </span>
      </GradientCard>
    );
  }

  const { quorum } = proposal;
  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);
  const votes = getVoteCount(proposalVotingPower);
  const proposalStatus = getProposalStatus(
    isVotingOpen,
    quorum,
    proposalVotingPower,
  );

  return (
    <GradientCard
      style={
        // hack for now, need to fix <body> height
        { height: "85vh" }
      }
      className={classNames(
        className,
        "flex flex-col items-start h-full w-80 p-6 justify-center",
      )}
    >
      <h1 className="text-2xl font-bold text-white">
        {t`Proposal ${proposal.proposalId}`}
      </h1>

      <p className="font-light text-white">{snapshotProposal?.title}</p>

      <p className="my-3 overflow-hidden text-sm font-light text-white">
        {t`Proposal Description:`}
      </p>

      <p className="overflow-hidden text-sm font-light text-white text-ellipsis">
        {truncateText(snapshotProposal?.body || "")}
      </p>

      <p className="my-3 overflow-hidden">
        <a
          href={snapshotProposal?.link || ""}
          className="flex items-center text-sm font-light text-white"
        >
          {t`View proposal`}
          <ExternalLinkIcon className="h-4 ml-2" />
        </a>
      </p>

      <p className="my-3 overflow-hidden">
        <a
          href="https://forum.element.fi"
          className="flex items-center text-sm font-light text-white"
        >
          {t`View Discussion`}
          <ExternalLinkIcon className="h-4 ml-2" />
        </a>
      </p>

      <QuorumBar quorum={quorum} votes={votes} status={proposalStatus} />
      <BalanceWithLabel
        className="w-full mt-4"
        balance={formattedAccountVotingPower}
        tooltipText={votingPowerTooltipText}
        tooltipHref={"/resources"}
        label={t`Voting Power`}
      />
      <BalanceWithLabel
        className="w-full mt-4"
        balance={amountDeposited}
        tooltipText={votingBalanceTooltipText}
        tooltipHref={"/resources"}
        label={t`Eligible voting balance`}
      />

      <div className="flex items-end justify-between flex-1 w-full">
        <PopoverButton
          popover={
            <Card variant={CardVariant.BLUE}>
              <div>choice 1</div>
              <div>choice 1</div>
              <div>choice 1</div>
            </Card>
          }
        >
          <div>
            <span>{t`Choice`}</span>

            <ChevronDownIcon
              className={`${true ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
          </div>
        </PopoverButton>
        <Button variant={ButtonVariant.WHITE}>{t`Submit`}</Button>
      </div>
    </GradientCard>
  );
}

interface QuorumBarProps {
  votes: number;
  quorum: number;
  status: ProposalStatus | undefined;
}
function QuorumBar(props: QuorumBarProps) {
  const { votes, quorum } = props;
  const quorumPercent = Math.round((votes / quorum) * 100);
  return (
    <div className="w-full space-y-1 text-sm text-white">
      <div>
        {votes} {t`total votes`}
      </div>
      <ProgressBar progress={Math.max(votes / quorum, 1)} />
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
): SnapshotProposal | undefined {
  const { data: snapshotProposals } = useSnapshotProposals(
    Object.keys(proposalsBySnapShotId),
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

function getVoteCount(votingPower: VotingPower | undefined): number {
  if (!votingPower) {
    return 0;
  }

  return votingPower[0].gt(votingPower[1])
    ? votingPower[0].toNumber()
    : votingPower[0].toNumber();
}
