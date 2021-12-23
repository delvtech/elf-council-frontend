import React, { ReactElement } from "react";

import { ExternalLinkIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { Proposal } from "elf-council-proposals";
import { commify } from "ethers/lib/utils";
import Link from "next/link";
import { proposalsBySnapShotId } from "src/elf-council-proposals";
import { SnapshotProposal } from "src/elf-snapshot/queries/proposals";
import tw, {
  alignItems,
  display,
  flex,
  flexDirection,
  fontSize,
  fontWeight,
  height,
  justifyContent,
  margin,
  overflow,
  padding,
  textAlign,
  textColor,
  textOverflow,
  width,
} from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import GradientCard from "src/ui/base/Card/GradientCard";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { InfoIconWithTooltip } from "src/ui/base/InfoIconWithTooltip";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";
import classnames from "classnames";

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
        className={classNames(
          "flex w-80 h-full p-6 justify-center items-center",
          className,
        )}
      >
        <span
          className={tw(
            textColor("text-white"),
            textAlign("text-center"),
            fontSize("text-2xl"),
            fontWeight("font-bold"),
          )}
        >
          {t`Click on a proposal to learn more about it here.`}
        </span>
      </GradientCard>
    );
  }

  return (
    <GradientCard
      className={classNames(
        className,
        tw(
          display("flex"),
          flexDirection("flex-col"),
          alignItems("items-start"),
          height("h-full"),
          width("w-80"),
          padding("p-6"),
          justifyContent("justify-center"),
        ),
      )}
    >
      <h1
        className={tw(
          textColor("text-white"),
          fontSize("text-2xl"),
          fontWeight("font-bold"),
        )}
      >
        {t`Proposal ${proposal.proposalId}`}
      </h1>
      <p className={tw(textColor("text-white"), fontWeight("font-light"))}>
        {snapshotProposal?.title}
      </p>
      <p
        className={tw(
          fontSize("text-sm"),
          textColor("text-white"),
          fontWeight("font-light"),
          margin("my-3"),
          overflow("overflow-hidden"),
        )}
      >
        {t`Proposal Description:`}
      </p>
      <p
        className={tw(
          fontSize("text-sm"),
          textColor("text-white"),
          fontWeight("font-light"),
          overflow("overflow-hidden"),
          textOverflow("text-ellipsis"),
        )}
      >
        {truncateText(snapshotProposal?.body || "")}
      </p>
      <p
        className={tw(
          display("flex"),
          alignItems("items-center"),
          fontSize("text-sm"),
          textColor("text-white"),
          fontWeight("font-light"),
          margin("my-3"),
          overflow("overflow-hidden"),
        )}
      >
        {t`View proposal`}
        <Link passHref={true} href={snapshotProposal?.link || ""}>
          <button>
            <ExternalLinkIcon className={tw(margin("ml-2"), height("h-4"))} />
          </button>
        </Link>
      </p>
      <p
        className={tw(
          display("flex"),
          alignItems("items-center"),
          fontSize("text-sm"),
          textColor("text-white"),
          fontWeight("font-light"),
          margin("my-3"),
          overflow("overflow-hidden"),
        )}
      >
        {t`View Discussion`}
        <Link passHref={true} href={"https://forum.element.fi"}>
          <button>
            <ExternalLinkIcon className={tw(margin("ml-2"), height("h-4"))} />
          </button>
        </Link>
      </p>

      <BalanceWithLabel
        className={tw(width("w-full"), margin("mt-8"))}
        balance={formattedVotingPower}
        tooltipText={votingPowerTooltipText}
        tooltipHref={"/resources"}
        label={t`Voting Power`}
      />
      <BalanceWithLabel
        className={tw(width("w-full"), margin("mt-8"))}
        balance={amountDeposited}
        tooltipText={votingBalanceTooltipText}
        tooltipHref={"/resources"}
        label={t`Eligible voting balance`}
      />

      <div
        className={tw(
          display("flex"),
          flex("flex-1"),
          width("w-full"),
          alignItems("items-end"),
          justifyContent("justify-between"),
        )}
      >
        <Button variant={ButtonVariant.WHITE}>{t`Choice`}</Button>
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

function truncateText(text: string, characterLimit = 250) {
  if (text.length <= characterLimit) {
    return text;
  }

  return `${text.slice(0, 250)}...`;
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
    <div className={classNames(className, tw(textColor("text-white")))}>
      <div className={tw(display("flex"), alignItems("items-center"))}>
        <div
          className={tw(fontSize("text-2xl"), fontWeight("font-extralight"))}
        >
          {balance}
        </div>
        <ElementIcon className={tw(margin("ml-2"))} size={IconSize.MEDIUM} />
      </div>
      <div
        className={tw(
          display("flex"),
          fontSize("text-lg"),
          fontWeight("font-light"),
          alignItems("items-center"),
        )}
      >
        {label}
        {tooltipText && (
          <InfoIconWithTooltip
            className={tw(margin("ml-1"))}
            tooltipText={tooltipText}
            tooltipHref={tooltipHref}
          />
        )}
      </div>
    </div>
  );
}
