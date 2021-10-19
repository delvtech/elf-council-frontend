import React, { ReactElement, useCallback } from "react";

import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import Card from "src/ui/base/Card/Card";
import H3 from "src/ui/base/H3";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { t } from "ttag";

function PortfolioCard(): ReactElement {
  const walletBalance = "100";
  const onClaimRewards = useCallback(() => {}, []);
  return (
    <Card>
      <H3 className={tw("text-blue-900", "font-semibold")}>{t`Portfolio`}</H3>
      <div className={tw("flex")}>
        <LabeledStat data={walletBalance} bottomLabel={t`Wallet balance`} />
        <LabeledStat data={walletBalance} bottomLabel={t`Staked tokens`} />
        <LabeledStat data={walletBalance} bottomLabel={t`Unclaimed rewards`} />
      </div>

      <div className={tw("flex", "justify-end")}>
        <Button onClick={onClaimRewards}>{t`Claim Rewards`}</Button>
      </div>
      <div className={tw("flex")}>
        <LabeledStat data={walletBalance} bottomLabel={t`Voting Power`} />
        <LabeledStat data={"24D 8H 17M"} bottomLabel={t`Next vote ends`} />
      </div>
      <p className={tw("text-lg", "text-blue-500", "font-semibold")}></p>
      <div className={tw("flex")}>
        <LabeledStat data={walletBalance} bottomLabel={t`Delegate powers`} />
        <LabeledStat data={"0xDEAD...BEEF"} bottomLabel={t`Past delegation`} />
        <LabeledStat data={"YES"} bottomLabel={t`Current voting status`} />
      </div>
    </Card>
  );
}

export default PortfolioCard;
