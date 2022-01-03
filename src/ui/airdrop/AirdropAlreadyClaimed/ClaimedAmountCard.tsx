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

interface ClaimedAmountCardProps {
  account: string | null | undefined;
}
export function ClaimedAmountCard({
  account,
}: ClaimedAmountCardProps): ReactElement {
  const claimedAmount = useClaimedAirdrop(account);
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
        >{t`You deposited`}</div>
        <div className={tw(flex("flex-1"))}>
          <div
            className={tw(
              textColor("text-principalRoyalBlue"),
              fontSize("text-2xl"),
              fontWeight("font-bold"),
            )}
          >
            {claimedAmount}
          </div>
          <div
            className={tw(
              textColor("text-gray-500"),
              display("flex"),
              flexDirection("flex-col"),
              alignItems("items-center"),
            )}
          >
            <span className={tw(margin("mb-4"))}>{t`$ELFI tokens`}</span>
            <ElementIcon
              bgColorClassName="bg-paleLily"
              className={tw(margin("ml-2"))}
              size={IconSize.LARGE}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
