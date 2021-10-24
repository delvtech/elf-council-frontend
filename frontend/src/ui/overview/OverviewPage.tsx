import React, { ReactElement } from "react";

import { useWeb3React } from "@web3-react/core";
import tw from "src/elf-tailwindcss-classnames";
import H1 from "src/ui/base/H1";
import PortfolioCard from "src/ui/overview/PortfolioCard";
import RewardsCard from "src/ui/overview/RewardsCard";
import VotingCard from "src/ui/overview/VotingCard";
import { useSigner } from "src/ui/signer/useSigner";
import { t } from "ttag";

import { SummaryCards } from "./SummaryCards";
import DepositCard from "src/ui/overview/DepositCard/DepositCard";

export function OverviewPage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = useSigner(account, library);
  return (
    <div className={tw("h-full", "space-y-6")}>
      <div className={tw("px-8", "py-1")}>
        <H1 className={tw("text-center")}> {t`Governance Overview`}</H1>
      </div>
      <SummaryCards />
      <div
        className={tw(
          "grid",
          "grid-cols-1",
          "lg:grid-cols-2",
          "space-y-6",
          "space-x-0",
          "lg:space-x-6",
          "lg:space-y-0"
        )}
      >
        <PortfolioCard />
        <VotingCard />
      </div>
      <div className={tw("flex", "space-x-6")}>
        <DepositCard account={account} signer={signer} />
      </div>
      <div className={tw("flex", "space-x-6")}>
        <RewardsCard account={account} signer={signer} />
      </div>
    </div>
  );
}

export default OverviewPage;
