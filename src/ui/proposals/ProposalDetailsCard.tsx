import { Proposal } from "elf-council-proposals";
import React, { ReactElement } from "react";
import tw, {
  display,
  width,
  padding,
  justifyContent,
  alignItems,
  textColor,
  textAlign,
  fontSize,
  fontWeight,
} from "src/elf-tailwindcss-classnames";
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
        className={tw(
          display("flex"),
          width("w-96"),
          padding("p-6"),
          justifyContent("justify-center"),
          alignItems("items-center"),
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
    <GradientCard className={width("w-96")}>
      <h1
        className={tw(
          textColor("text-white"),
          fontSize("text-2xl"),
          fontWeight("font-bold"),
        )}
      >
        {t`Proposal #${proposal.proposalId}`}
      </h1>
    </GradientCard>
  );
}
