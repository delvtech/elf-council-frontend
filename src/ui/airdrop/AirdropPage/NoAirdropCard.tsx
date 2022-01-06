import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";

export function NoAirdropCard(): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className="flex flex-col text-white text-center h-full justify-center items-center"
    >
      <div className="text-center text-sm mb-4">
        <div className="font-semibold tracking-wider">{t`Sorry, no airdrop found for this wallet.`}</div>
      </div>
      <div className="text-2xl font-bold text-white mb-6">{t`0 ELFI`}</div>
    </Card>
  );
}
