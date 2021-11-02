import React, { ReactElement } from "react";

import { commify } from "ethers/lib/utils";
import tw from "src/elf-tailwindcss-classnames";
import SummaryCard from "src/ui/overview/SummaryCard";
import { useClaimedToday } from "src/ui/rewards/useClaimedToday";
import { useVotingPowerForProtocol } from "src/ui/voting/useVotingPowerForProtocol";
import { t } from "ttag";

import { ProgressCircle } from "./ProgressCircle";

// For launch we are hardcoding the circulating supply to the total claimable tokens in the rewards
// contract.  This will eventually be expanded to to include claimablea tokens from the vesting
// contracts and other sources
const ELEMENT_CIRCULATING_SUPPLY = 5_000_000;
const ELEMENT_TOTAL_SUPPLY = 100_000_000;

export function SummaryCards(): ReactElement {
  const percent = (
    (ELEMENT_CIRCULATING_SUPPLY / ELEMENT_TOTAL_SUPPLY) *
    100
  ).toFixed(1);

  const claimedToday = useClaimedToday();
  const votingPower = useVotingPowerForProtocol();

  return (
    <div
      className={tw(
        "flex",
        "flex-col",
        "space-y-6",
        "lg:space-y-0",
        "lg:grid",
        "lg:grid-cols-3",
        "lg:gap-6"
      )}
    >
      <SummaryCard title={t`Claimed Today`} balance={claimedToday} />
      <SummaryCard
        title={t`Circulating Supply`}
        balance={`${commify(ELEMENT_CIRCULATING_SUPPLY)} / ${commify(
          ELEMENT_TOTAL_SUPPLY
        )}`}
      >
        <ProgressCircle percent={percent} />
      </SummaryCard>
      <SummaryCard
        title={t`
     Total Voting Power`}
        balance={commify(votingPower)}
      />
    </div>
  );
}
