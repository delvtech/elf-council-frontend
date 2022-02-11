import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { commify } from "ethers/lib/utils";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import { getFeaturedDelegate } from "src/elf/delegate/isFeaturedDelegate";
import { formatWalletAddress } from "src/formatWalletAddress";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";

interface AirdropAmountCardProps {
  account: string | null | undefined;
  delegateAddress: string;
}
export function AirdropAmountCard({
  account,
  delegateAddress,
}: AirdropAmountCardProps): ReactElement {
  const { data: merkleInfo } = useMerkleInfo(account);

  const claimableBalance = useUnclaimedAirdrop(account, merkleInfo);
  const featuredDelegate = getFeaturedDelegate(delegateAddress);
  const formattedAddress = formatWalletAddress(delegateAddress);
  const delegateLabel = featuredDelegate
    ? featuredDelegate.name
    : formattedAddress;

  return (
    <Card
      variant={CardVariant.HACKER_SKY}
      className="h-64 text-center shadow-[0_0_52px_rgba(143,216,231,.7)]"
    >
      <div className="flex h-full w-full flex-col justify-center px-8 ">
        <div className="font-bold text-principalRoyalBlue text-opacity-60">{t`Airdrop amount`}</div>
        <div className="mb-10">
          <div className="flex items-center justify-center gap-2 font-bold text-principalRoyalBlue md:text-3xl">
            <ElementIcon className="ml-1 bg-paleLily" size={IconSize.MEDIUM} />
            {t`${claimableBalance ? commify(claimableBalance) : 0} ELFI`}
          </div>
        </div>

        <div className="font-bold text-principalRoyalBlue text-opacity-60">{t`will be delegated to`}</div>
        <div className="flex items-center justify-center font-bold text-principalRoyalBlue md:text-3xl">
          <WalletJazzicon
            className="flex justify-center"
            account={delegateAddress}
            size={24}
          />
          <span className="ml-1">{delegateLabel}</span>{" "}
        </div>
      </div>
    </Card>
  );
}
