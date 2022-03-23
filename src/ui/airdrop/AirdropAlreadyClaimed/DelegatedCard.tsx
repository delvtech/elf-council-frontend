import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { useDelegate } from "src/ui/delegate/useDelegate";
import { ButtonVariant } from "src/ui/base/Button/styles";
import LinkButton from "src/ui/base/Button/LinkButton";
import { getFeaturedDelegate } from "src/elf/delegate/isFeaturedDelegate";
import { useFormattedWalletAddress } from "src/ui/ethereum/useFormattedWalletAddress";
import { Provider } from "@ethersproject/providers";

interface DelegatedCardProps {
  account: string | null | undefined;
  provider?: Provider;
}
export function DelegatedCard({
  account,
  provider,
}: DelegatedCardProps): ReactElement {
  const delegateAddress = useDelegate(account);
  const formattedAddress = useFormattedWalletAddress(delegateAddress, provider);
  const featuredDelegate =
    delegateAddress && getFeaturedDelegate(delegateAddress);

  return (
    <Card variant={CardVariant.HACKER_SKY} className="h-64 flex-1">
      <div className="flex h-full w-full flex-col">
        <div className="mb-2 text-lg font-bold text-gray-500">{t`You delegated to`}</div>
        <div className="flex-1">
          <div className="text-lg font-bold text-principalRoyalBlue">
            {(featuredDelegate && featuredDelegate.name) || formattedAddress}
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <span className="mb-4">{formattedAddress}</span>
            <LinkButton
              link="/delegate"
              variant={ButtonVariant.WHITE}
            >{t`Visit dashboard`}</LinkButton>
          </div>
        </div>
      </div>
    </Card>
  );
}
