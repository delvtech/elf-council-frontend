import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2/H2";
import { t } from "ttag";

export function NoAirdropCard(): ReactElement {
  return (
    <Card variant={CardVariant.BLUE}>
      <div className="flex flex-col justify-center gap-2 px-6 pt-6 pb-4 text-white sm:pt-20 sm:px-20 sm:pb-14 sm:text-center sm:items-center">
        <h1 className="mb-5 text-3xl font-semibold">{t`No airdrop found`}</h1>
        <H2 className="text-2xl text-goldYellow">{t`This wallet is not eligible for the airdrop`}</H2>
        <p className="mb-12 sm:mb-24">{t`Please make sure you are connected with the right account`}</p>
      </div>
    </Card>
  );
}
