import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { commify } from "ethers/lib/utils";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";

interface AirdropAmountCardProps {
  account: string | null | undefined;
  delegateAddress: string | null;
}
export function AirdropAmountCard({
  account,
  delegateAddress,
}: AirdropAmountCardProps): ReactElement {
  const { data: merkleInfo } = useMerkleInfo(account);

  const claimableBalance = useUnclaimedAirdrop(account, merkleInfo);

  const airdropAmountLabel = getAirdropAmountLabel(claimableBalance);
  return (
    <Card variant={CardVariant.HACKER_SKY} className="h-64 text-center w-96">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="mb-2 font-bold text-principalRoyalBlue text-opacity-60">{t`You will deposit`}</div>
        <div className="flex justify-center gap-2 text-2xl font-bold text-center text-principalRoyalBlue">
          <ElementIcon
            bgColorClassName="bg-paleLily"
            className="ml-2"
            size={IconSize.MEDIUM}
          />
          <span>{airdropAmountLabel}</span>
        </div>
        {delegateAddress ? (
          <div className="mb-2 font-bold text-principalRoyalBlue text-opacity-60">{t`and delegate voting power to`}</div>
        ) : null}
      </div>
    </Card>
  );
}

function getAirdropAmountLabel(claimableBalance: string): string {
  if (claimableBalance) {
    return t`${commify(claimableBalance)} ELFI`;
  }

  return t`0 ELFI`;
}
