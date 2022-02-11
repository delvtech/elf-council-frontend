import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { useDelegate } from "src/ui/delegate/useDelegate";
import { formatWalletAddress } from "src/formatWalletAddress";
import { ButtonVariant } from "src/ui/base/Button/styles";
import LinkButton from "src/ui/base/Button/LinkButton";
import { getFeaturedDelegate } from "src/elf/delegate/isFeaturedDelegate";

interface DelegatedCardProps {
  account: string | null | undefined;
}
export function DelegatedCard({ account }: DelegatedCardProps): ReactElement {
  const delegateAddress = useDelegate(account);
  const delegateLabel = formatDelegateLabel(delegateAddress);

  return (
    <Card variant={CardVariant.HACKER_SKY} className="h-64 flex-1">
      <div className="flex h-full w-full flex-col">
        <div className="mb-2 text-lg font-bold text-gray-500">{t`You delegated to`}</div>
        <div className="flex-1">
          <div className="text-lg font-bold text-principalRoyalBlue">
            {delegateLabel}
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <span className="mb-4">
              {delegateAddress
                ? formatWalletAddress(delegateAddress as string)
                : null}
            </span>
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

function formatDelegateLabel(delegateAddress: string | undefined) {
  if (!delegateAddress) {
    return t`N/A`;
  }

  const featuredDelegate = getFeaturedDelegate(delegateAddress);
  if (featuredDelegate) {
    return featuredDelegate.name;
  }

  return formatWalletAddress(delegateAddress);
}
