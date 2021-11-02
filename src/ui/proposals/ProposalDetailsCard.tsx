import { Proposal } from "elf-council-proposals";
import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import GradientCard from "src/ui/base/Card/GradientCard";
import { t } from "ttag";

interface ProposalDetailsCardProps {
  proposal: Proposal | undefined;
}

export function ProposalDetailsCard({
  proposal,
}: ProposalDetailsCardProps): ReactElement {
  if (!proposal) {
    return (
      <GradientCard
        className={tw("flex", 'w-96',"p-6", "justify-center", "items-center")}
      >
        <span
          className={tw("text-white", "text-center", "text-2xl", "font-bold")}
        >
          {t`Click on a proposal to learn more about it here.`}
        </span>
      </GradientCard>
    );
  }
  return (
    <GradientCard className={tw("w-96")}>
      <h1 className={tw("text-white", "text-2xl", "font-bold")}>
        {t`Proposal #${proposal.proposalId}`}
      </h1>
    </GradientCard>
  );
}
