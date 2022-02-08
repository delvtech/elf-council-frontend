import React, { ReactElement } from "react";

import { useSmartContractEvents } from "@elementfi/react-query-typechain";
import { ProposalsJson } from "elf-council-proposals";
import { BigNumber } from "ethers";
import { t } from "ttag";

import { abbreviateLargeValue } from "src/base/numbers";
import { lockingVaultContract } from "src/elf/contracts";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import SummaryCard from "src/ui/overview/SummaryCard";
import { useVotingPowerForProtocol } from "src/ui/voting/useVotingPowerForProtocol";

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
    <div className="flex flex-col justify-around space-y-6 lg:space-y-0 lg:flex-row lg:space-x-6">
      <SummaryCard
        title={t`Active Proposals`}
        balance={numActiveProposals}
        tooltipContent={t`Click to find out more.`}
      />
      <SummaryCard
        title={t`Total Delegates`}
        balance={numDelegates}
        tooltipContent={t`Click to find out more.`}
      />
      <SummaryCard
        title={t`Circulating Voting Power`}
        balance={`${formattedTotalVotingPower} ELFI`}
        tooltipContent={t`Click to find out more.`}
      />
    </div>
  );
}

function useNumDelegates() {
  const { data: events } = useSmartContractEvents(
    lockingVaultContract,
    "VoteChange",
  );

  // tally of vote power by delegate
  const votePowerByDelegates: Record<string, BigNumber> = {};
  events?.forEach((event) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [unusedAccount, delegate, amount]: [string, string, BigNumber] =
      event.args as [string, string, BigNumber];
    if (delegate in votePowerByDelegates) {
      votePowerByDelegates[delegate] =
        votePowerByDelegates[delegate].add(amount);
    }

    votePowerByDelegates[delegate] = amount;
  });

  const delegatedVotes = Object.values(votePowerByDelegates);

  delegatedVotes.filter((votePower) => !votePower.isZero());

  return delegatedVotes.length;
}
