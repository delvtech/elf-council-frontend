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
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { useClaimedAirdrop } from "src/ui/airdrop/useClaimedAirdrop";
import { useDelegate } from "src/ui/delegate/useDelegate";
import { formatWalletAddress } from "src/formatWalletAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Button from "src/ui/base/Button/Button";
import LinkButton from "src/ui/base/Button/LinkButton";

interface DelegatedCardProps {
  account: string | null | undefined;
}
export function DelegatedCard({ account }: DelegatedCardProps): ReactElement {
  const delegateAddress = useDelegate(account);
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
            {delegates.find(({ address }) => delegateAddress === address)?.name}
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
              {formatWalletAddress(delegateAddress as string)}
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
