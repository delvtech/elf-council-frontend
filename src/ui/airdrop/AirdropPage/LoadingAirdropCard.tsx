import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";

export function LoadingAirdropCard(): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className="flex h-full flex-col items-center justify-center text-center text-white"
    >
      <div className="mb-4 flex animate-pulse flex-col items-center justify-center text-center text-sm">
        <div className="font-semibold tracking-wider">{t`Checking for airdrop rewards...`}</div>
      </div>
    </Card>
  );
}
