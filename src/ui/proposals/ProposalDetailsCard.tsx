import React, { ReactElement } from "react";

import { ExternalLinkIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { Proposal } from "elf-council-proposals";
import Link from "next/link";
import { proposalsBySnapShotId } from "src/elf-council-proposals";
import { SnapshotProposal } from "src/elf-snapshot/queries/proposals";
import tw, {
  alignItems,
  display,
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
import GradientCard from "src/ui/base/Card/GradientCard";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { t } from "ttag";

interface ProposalDetailsCardProps {
  className?: string;
  proposal: Proposal | undefined;
}

export function ProposalDetailsCard(
  props: ProposalDetailsCardProps,
): ReactElement {
  const { className, proposal } = props;

  const snapshotProposal = useSnapshotProposal(proposal?.snapshotId);

  if (!proposal) {
    return (
      <GradientCard
        className={classNames(
          className,
          tw(
            display("flex"),
            width("w-80"),
            height("h-full"),
            padding("p-6"),
            justifyContent("justify-center"),
            alignItems("items-center"),
          ),
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
          height("h-full"),
          width("w-80"),
          padding("p-6"),
          justifyContent("justify-center"),
          alignItems("items-center"),
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
