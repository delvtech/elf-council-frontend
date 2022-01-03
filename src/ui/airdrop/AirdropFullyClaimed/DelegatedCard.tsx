import React, { ReactElement } from "react";
import tw, {
  display,
  flexDirection,
  textColor,
  height,
  alignItems,
  fontSize,
  margin,
  fontWeight,
  width,
  flex,
} from "src/elf-tailwindcss-classnames";
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
    <Card
      variant={CardVariant.HACKER_SKY}
      className={tw(flex("flex-1"), height("h-64"))}
    >
      <div
        className={tw(
          height("h-full"),
          width("w-full"),
          display("flex"),
          flexDirection("flex-col"),
        )}
      >
        <div
          className={tw(
            fontSize("text-lg"),
            fontWeight("font-bold"),
            textColor("text-gray-500"),
            margin("mb-2"),
          )}
        >{t`You've delegated to`}</div>
        <div className={tw(flex("flex-1"))}>
          <div
            className={tw(
              textColor("text-principalRoyalBlue"),
              fontSize("text-lg"),
              fontWeight("font-bold"),
            )}
          >
            {delegateLabel}
          </div>
          <div
            className={tw(
              textColor("text-gray-500"),
              display("flex"),
              flexDirection("flex-col"),
              alignItems("items-center"),
            )}
          >
            <span className={tw(margin("mb-4"))}>
              {delegateAddress
                ? formatWalletAddress(delegateAddress as string)
                : null}
            </span>
            <LinkButton
              link="/delegates"
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
