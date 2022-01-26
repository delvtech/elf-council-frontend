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
    <Card variant={CardVariant.HACKER_SKY} className="flex-1 h-64">
      <div className="h-full w-full flex flex-col">
        <div className="text-lg font-bold text-gray-500 mb-2">{t`You delegated to`}</div>
        <div className="flex-1">
          <div className="text-principalRoyalBlue text-lg font-bold">
            {delegateLabel}
          </div>
          <div className="text-gray-500 flex flex-col items-center">
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
