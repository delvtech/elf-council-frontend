import React, { ReactElement } from "react";

import { commify } from "ethers/lib/utils";
import tw from "src/elf-tailwindcss-classnames";
import SummaryCard from "src/ui/overview/SummaryCard";
import { useVotingPowerForProtocol } from "src/ui/voting/useVotingPowerForProtocol";
import { t } from "ttag";

export function SummaryCards(): ReactElement {
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
      <SummaryCard title={t`Annual protocol revenue`} balance={"$180,000"} />
      <SummaryCard title={t`Total treasury`} balance={"5M ELFI"} />
      <SummaryCard
        title={t`Total Voting Power`}
        balance={commify(votingPower)}
      />
    </div>
  );
}
