import React, { ReactElement } from "react";
import { Signer } from "@ethersproject/abstract-signer";
import { Proposal } from "elf-council-proposals";
import { getIsVotingOpen } from "src/elf-council-proposals";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { t } from "ttag";

interface StatusButtonProps {
  signer: Signer | undefined;
  proposal: Proposal;
}
export function StatusButton({
  proposal,
}: StatusButtonProps): ReactElement | null {
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();
  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);

  if (isVotingOpen) {
    return (
      <Tag intent={Intent.WARNING}>
        <div className="flex items-center space-x-8">
          <svg
            className="-ml-0.5 mr-1.5 h-3 w-3"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg>
          {t`In progress`}
        </div>
      </Tag>
    );
  }
  return null;
}
