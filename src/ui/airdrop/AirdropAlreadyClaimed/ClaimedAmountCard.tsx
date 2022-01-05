import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { useClaimedAirdrop } from "src/ui/airdrop/useClaimedAirdrop";

interface ClaimedAmountCardProps {
  account: string | null | undefined;
}
export function ClaimedAmountCard({
  account,
}: ClaimedAmountCardProps): ReactElement {
  const claimedAmount = useClaimedAirdrop(account);
  return (
    <Card variant={CardVariant.HACKER_SKY} className="flex-1 h-64">
      <div className="h-full w-full flex flex-col">
        <div className="text-lg font-bold text-gray-500 mb-2">{t`You claimed and deposited`}</div>
        <div className="flex-1">
          <div className="text-principalRoyalBlue text-2xl font-bold">
            {claimedAmount}
          </div>
          <div className="text-gray-500 flex flex-col items-center">
            <span className="mb-4">{t`$ELFI tokens`}</span>
            <ElementIcon
              bgColorClassName="bg-paleLily"
              className="ml-2"
              size={IconSize.LARGE}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
