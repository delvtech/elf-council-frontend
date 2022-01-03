import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { getFeaturedDelegate } from "src/elf/delegate/isFeaturedDelegate";
import { formatWalletAddress } from "src/formatWalletAddress";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { TwitterIconFromFigma } from "src/ui/base/TwitterIconFromFigma";
import { formatTwitterAccountUrl } from "src/twitter";

interface DelegatePreviewCardProps {
  delegateAddress: string;
}
export function DelegatePreviewCard({
  delegateAddress,
}: DelegatePreviewCardProps): ReactElement {
  const featuredDelegate = getFeaturedDelegate(delegateAddress);
  const formattedAddress = formatWalletAddress(delegateAddress);
  const delegateLabel = featuredDelegate
    ? featuredDelegate.name
    : formattedAddress;

  const twitterUrl = featuredDelegate
    ? formatTwitterAccountUrl(featuredDelegate.twitterHandle)
    : undefined;

  return (
    <Card variant={CardVariant.HACKER_SKY} className="flex-1 h-64 text-center">
      <div className="h-full w-full flex flex-col">
        <div className="text-lg font-bold text-principalRoyalBlue text-opacity-60 mb-2">{t`You're delegating to`}</div>
        <div className="flex-1">
          <div className="flex items-center justify-center text-principalRoyalBlue text-2xl font-bold">
            <span className="mr-2">{delegateLabel}</span>{" "}
            {twitterUrl ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={twitterUrl}
                className="hover:bg-principalRoyalBlue/10 p-2 rounded-full"
              >
                <TwitterIconFromFigma />
              </a>
            ) : null}
          </div>
          <div className="text-gray-500 flex flex-col items-center">
            <span className="mb-4">{formattedAddress}</span>
            <Button variant={ButtonVariant.WHITE}>{t`Visit Dashboard`}</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
