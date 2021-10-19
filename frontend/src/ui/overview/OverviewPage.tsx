import React, { ReactElement } from "react";

import tw from "src/elf-tailwindcss-classnames";
import H1 from "src/ui/base/H1";
import PortfolioCard from "src/ui/overview/PortfolioCard";
import RewardsCard from "src/ui/overview/RewardsCard";
import VotingCard from "src/ui/overview/VotingCard";
import { t } from "ttag";

import { SummaryCards } from "./SummaryCards";

export function OverviewPage(): ReactElement {
  return (
    <div className={tw("h-full")}>
      <div className={tw("px-8", "py-1")}>
        <H1 className={tw("text-center")}> {t`Governance Overview`}</H1>
      </div>
      <SummaryCards />
      <div className={tw("flex", "ml-3", "mt-6", "space-x-6", "mr-4")}>
        <PortfolioCard />
        <VotingCard />
      </div>
      <div className={tw("flex", "ml-3", "mt-6", "space-x-6", "mr-4")}>
        <RewardsCard />
      </div>
    </div>
  );
}

export default OverviewPage;
