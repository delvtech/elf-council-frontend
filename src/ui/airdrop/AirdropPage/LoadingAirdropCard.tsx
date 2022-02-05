import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";

export function LoadingAirdropCard(): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className="flex flex-col items-center justify-center h-full text-center text-white"
    >
      <div className="flex flex-col items-center justify-center mb-4 text-sm text-center animate-pulse">
        <div className="font-semibold tracking-wider">{t`Checking for airdrop rewards...`}</div>
      </div>
    </Card>
  );
}
