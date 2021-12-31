import React, { ReactElement } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { ExternalLinkIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { Proposal } from "elf-council-proposals";
import { commify } from "ethers/lib/utils";
import Link from "next/link";
import { proposalsBySnapShotId } from "src/elf-council-proposals";
import { SnapshotProposal } from "src/elf-snapshot/queries/proposals";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import GradientCard from "src/ui/base/Card/GradientCard";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { InfoIconWithTooltip } from "src/ui/base/InfoIconWithTooltip";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { ProgressBar } from "src/ui/base/ProgressBar/ProgressBar";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { t } from "ttag";
import PopoverButton from "src/ui/base/Button/PopoverButton";
import Card, { CardVariant } from "src/ui/base/Card/Card";

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

  const votingPower = useVotingPowerForAccount(account);

  const formattedVotingPower = commify((+votingPower).toFixed(4));

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

      <p className="flex items-center my-3 overflow-hidden text-sm font-light text-white">
        {t`View proposal`}
        <Link passHref={true} href={snapshotProposal?.link || ""}>
          <button>
            <ExternalLinkIcon className="h-4 ml-2" />
          </button>
        </Link>
      </p>

      <p className="flex items-center my-3 overflow-hidden text-sm font-light text-white">
        {t`View Discussion`}
        <Link passHref={true} href={"https://forum.element.fi"}>
          <button>
            <ExternalLinkIcon className="h-4 ml-2" />
          </button>
        </Link>
      </p>

      <div className="w-full space-y-1 text-sm text-white">
        <div>{t`1,434,234 Total votes`}</div>
        <ProgressBar progress={0.5} />
        <div>{t`7% quorum reached`}</div>
        <div className="text-xs">{t`(20,000,000 vote quorum)`}</div>
      </div>
      <BalanceWithLabel
        className="w-full mt-4"
        balance={formattedVotingPower}
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
          <InfoIconWithTooltip
            className="ml-1"
            tooltipText={tooltipText}
            tooltipHref={tooltipHref}
          />
        )}
      </div>
    </div>
  );
}
