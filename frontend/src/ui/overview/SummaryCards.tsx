import React, { ReactElement } from "react";

import { commify } from "ethers/lib/utils";
import tw from "src/elf-tailwindcss-classnames";
import SummaryCard from "src/ui/overview/SummaryCard";
import { useClaimedToday } from "src/ui/rewards/useClaimedToday";

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
      <SummaryCard title="Claimed Today" balance={claimedToday} />
      <SummaryCard
        title="Circulating Supply"
        balance={`${commify(ELEMENT_CIRCULATING_SUPPLY)} / ${commify(
          ELEMENT_TOTAL_SUPPLY
        )}`}
      >
        <ProgressCircle percent={percent} />
      </SummaryCard>
      <SummaryCard
        title="
     Total Voting Power"
        balance={100}
      />
    </div>
  );
}
