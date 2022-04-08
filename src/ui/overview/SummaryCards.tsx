import React, { ReactElement } from "react";

import { ProposalsJson } from "@elementfi/elf-council-proposals";
import { t } from "ttag";

import { abbreviateLargeValue } from "src/base/numbers";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import SummaryCard from "src/ui/overview/SummaryCard";
import { useVotingPowerForProtocol } from "src/ui/voting/useVotingPowerForProtocol";
import Link from "next/link";
import useNumDelegates from "./useNumDelegates";

interface SummaryCardsProps {
  proposalsJson: ProposalsJson;
}
export function SummaryCards({
  proposalsJson,
}: SummaryCardsProps): ReactElement {
  const { data: currentBlock } = useLatestBlockNumber();
  const numActiveProposals = currentBlock
    ? proposalsJson.proposals.filter(
        ({ expiration }) => expiration > currentBlock,
      ).length
    : 0;

  const numDelegates = useNumDelegates();

  const votingPower = useVotingPowerForProtocol();

  const formattedTotalVotingPower = abbreviateLargeValue(
    Math.round(votingPower),
  );

  return (
    <div className="flex flex-col justify-around space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
      <SummaryCard
        title={
          <Link href="/proposals">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="underline hover:no-underline">
              {t`Active Proposals`}
            </a>
          </Link>
        }
        balance={numActiveProposals}
      />
      <SummaryCard
        title={t`Total Participants`}
        balance={numDelegates}
        tooltipContent={t`The number of unique delegates (including self-delegates) with voting power in the system.`}
      />
      <SummaryCard
        title={t`Circulating ELFI`}
        balance={`${formattedTotalVotingPower}`}
        tooltipContent={t`The total amount of voting power in the system.`}
      />
    </div>
  );
}
