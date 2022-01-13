import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { commify } from "ethers/lib/utils";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";

interface AirdropAmountCardProps {
  account: string | null | undefined;
}
export function AirdropAmountCard({
  account,
}: AirdropAmountCardProps): ReactElement {
  const { data: merkleInfo } = useMerkleInfo(account);

  const claimableBalance = useUnclaimedAirdrop(account, merkleInfo);

  return (
    <Card variant={CardVariant.HACKER_SKY} className="flex-1 h-64 text-center">
      <div className="flex flex-col w-full h-full">
        <div className="mb-2 font-bold text-principalRoyalBlue text-opacity-60">{t`You will deposit`}</div>
        <div className="justify-center flex-1">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-principalRoyalBlue">
            <ElementIcon
              bgColorClassName="bg-paleLily"
              className="ml-2"
              size={IconSize.MEDIUM}
            />
            {t`${claimableBalance ? commify(claimableBalance) : 0} ELFI`}
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <span className="mb-4">{t`$ELFI tokens`}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
