import React, { ReactElement } from "react";

import tw from "src/elf-tailwindcss-classnames";
import Card from "src/ui/base/Card/Card";
import H3 from "src/ui/base/H3";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { t } from "ttag";

function VotingCard(): ReactElement {
  const walletBalance = "100";
  return (
    <Card>
      <H3 className={tw("text-blue-900", "font-semibold")}>{t`Voting`}</H3>
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

export default VotingCard;
