import React, { ReactElement } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import H1 from "src/ui/base/H1";
import { PortfolioCard } from "src/ui/overview/PortfolioCard";
import { t } from "ttag";

import { SummaryCards } from "./SummaryCards";

export function OverviewPage(): ReactElement {
  const { account } = useWeb3React<Web3Provider>();
  return (
    <div className="w-full h-full space-y-6">
      <div className="px-8 py-1">
        <H1 className="text-center"> {t`Governance Overview`}</H1>
      </div>
      <div className="flex flex-col justify-center w-full space-y-6 lg:space-x-6 lg:flex-row lg:space-y-0">
        <SummaryCards />
        <PortfolioCard account={account} />
      </div>
    </div>
  );
}

export default OverviewPage;
