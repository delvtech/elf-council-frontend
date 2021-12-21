import React, { ReactElement } from "react";

import classNames from "classnames";
import { Proposal } from "elf-council-proposals";
import tw, {
  alignItems,
  display,
  fontSize,
  fontWeight,
  justifyContent,
  padding,
  textAlign,
  textColor,
  width,
} from "src/elf-tailwindcss-classnames";
import GradientCard from "src/ui/base/Card/GradientCard";
import { t } from "ttag";

interface ProposalDetailsCardProps {
  className?: string;
  proposal: Proposal | undefined;
}

export function ProposalDetailsCard(
  props: ProposalDetailsCardProps,
): ReactElement {
  const { className, proposal } = props;
  if (!proposal) {
    return (
      <GradientCard
        className={classNames(
          className,
          tw(
            display("flex"),
            width("w-80"),
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
    <GradientCard className={classNames(className, tw(width("w-80")))}>
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
