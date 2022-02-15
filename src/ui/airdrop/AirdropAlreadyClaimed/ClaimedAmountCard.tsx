import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import { useClaimedAirdrop } from "src/ui/airdrop/useClaimedAirdrop";

interface ClaimedAmountCardProps {
  account: string | null | undefined;
}
export function ClaimedAmountCard({
  account,
}: ClaimedAmountCardProps): ReactElement {
  const claimedAmount = useClaimedAirdrop(account);
  return (
    <Card variant={CardVariant.HACKER_SKY} className="h-64 flex-1">
      <div className="flex h-full w-full flex-col">
        <div className="mb-2 text-lg font-bold text-gray-500">{t`You claimed and deposited`}</div>
        <div className="flex-1">
          <div className="text-2xl font-bold text-principalRoyalBlue">
            {claimedAmount}
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <span className="mb-4">{t`$ELFI tokens`}</span>
            <ElementIcon className="ml-2" size={IconSize.LARGE} />
          </div>
        </div>
      </div>
    </Card>
  );
}
