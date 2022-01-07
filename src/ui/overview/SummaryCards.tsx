import React, { ReactElement } from "react";

import { commify, formatEther } from "ethers/lib/utils";
import { t } from "ttag";

import { abbreviateLargeValue } from "src/base/numbers";
import { addressesJson } from "src/elf-council-addresses";
import { elementTokenContract } from "src/elf/contracts";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import SummaryCard from "src/ui/overview/SummaryCard";
import { useVotingPowerForProtocol } from "src/ui/voting/useVotingPowerForProtocol";

const { treasury } = addressesJson.addresses;

export function SummaryCards(): ReactElement {
  const votingPower = useVotingPowerForProtocol();
  const { data: treasuryBalanceBN } = useTokenBalanceOf(
    elementTokenContract,
    treasury,
  );

  const treasuryBalance = formatEther(treasuryBalanceBN || 0);
  const formattedTreasuryBalance = abbreviateLargeValue(+treasuryBalance);

  return (
    <div className="flex flex-col justify-around space-y-6 lg:space-y-0 lg:flex-row lg:space-x-6">
      <SummaryCard title={t`Annual protocol revenue`} balance={"$180,000"} />
      <SummaryCard
        title={t`Total treasury`}
        balance={`${formattedTreasuryBalance} ELFI`}
      />
      <SummaryCard
        title={t`Total Voting Power`}
        balance={commify(Math.round(votingPower))}
      />
    </div>
  );
}
