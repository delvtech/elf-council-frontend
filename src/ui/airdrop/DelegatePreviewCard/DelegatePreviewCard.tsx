import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { getFeaturedDelegate } from "src/elf/delegate/isFeaturedDelegate";
import { formatWalletAddress } from "src/formatWalletAddress";
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
      <div className="flex flex-col w-full h-full">
        <div className="mb-2 font-bold text-principalRoyalBlue text-opacity-60">{t`You're delegating to`}</div>
        <div className="flex-1">
          <div className="flex items-center justify-center text-2xl font-bold text-principalRoyalBlue">
            <span className="mr-2">{delegateLabel}</span>{" "}
            {twitterUrl ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={twitterUrl}
                className="p-2 rounded-full hover:bg-principalRoyalBlue/10"
              >
                <TwitterIconFromFigma />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
