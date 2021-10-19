import React, { ReactElement, useCallback } from "react";

import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import Card from "src/ui/base/Card/Card";
import H3 from "src/ui/base/H3";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { t } from "ttag";

function RewardsCard(): ReactElement {
  const walletBalance = "100";
  const onClaimRewards = useCallback(() => {}, []);
  return (
    <Card className={tw("w-full")}>
      <H3 className={tw("text-blue-900", "font-semibold")}>{t`Rewards`}</H3>
      <div className={tw("flex")}>
        <div className={tw("flex")}>
          <LabeledStat
            data={walletBalance}
            bottomLabel={t`Unclaimed rewards`}
          />
          <Button onClick={onClaimRewards}>{t`Claim Rewards`}</Button>
        </div>
      </div>
    </Card>
  );
}

export default RewardsCard;
