import React, { ReactElement } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import tw, {
  height,
  space,
  padding,
  textAlign,
  display,
  gridTemplateColumns,
} from "src/elf-tailwindcss-classnames";
import H1 from "src/ui/base/H1";
import { PortfolioCard } from "src/ui/overview/PortfolioCard";
import { t } from "ttag";

import { SummaryCards } from "./SummaryCards";

export function OverviewPage(): ReactElement {
  const { account } = useWeb3React<Web3Provider>();
  return (
    <div className={tw(height("h-full"), space("space-y-6"))}>
      <div className={padding("px-8", "py-1")}>
        <H1 className={textAlign("text-center")}>
          {" "}
          {t`Governance Overview`}
        </H1>
      </div>
      <SummaryCards />
      <div
        className={tw(
          display("grid"),
          gridTemplateColumns("grid-cols-1", "lg:grid-cols-2"),
          space("space-y-6", "space-x-0", "lg:space-x-6", "lg:space-y-0"),
        )}
      >
        <PortfolioCard account={account} />
      </div>
    </div>
  );
}

export default OverviewPage;
