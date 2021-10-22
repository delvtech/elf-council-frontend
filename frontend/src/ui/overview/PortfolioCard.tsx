import React, { ReactElement } from "react";

import tw from "src/elf-tailwindcss-classnames";
import Card from "src/ui/base/Card/Card";
import H3 from "src/ui/base/H3";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { t } from "ttag";

function PortfolioCard(): ReactElement {
  const walletBalance = "100";
  return (
    <Card>
      <H3 className={tw("text-blue-900", "font-semibold")}>{t`Portfolio`}</H3>
      <div className={tw("flex", "min-h-full", "align-bottom")}>
        <LabeledStat data={walletBalance} bottomLabel={t`Wallet balance`} />
        <LabeledStat data={walletBalance} bottomLabel={t`Staked tokens`} />
        <LabeledStat data={walletBalance} bottomLabel={t`Unclaimed rewards`} />
      </div>
    </Card>
  );
}

export default PortfolioCard;
