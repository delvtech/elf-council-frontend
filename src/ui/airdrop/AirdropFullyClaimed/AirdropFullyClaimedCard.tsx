import React, { ReactElement } from "react";
import { ShieldExclamationIcon } from "@heroicons/react/solid";
import tw, {
  display,
  flexDirection,
  textColor,
  textAlign,
  height,
  justifyContent,
  fontSize,
  margin,
  fontWeight,
  padding,
  space,
  width,
  flex,
} from "src/elf-tailwindcss-classnames";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import { t } from "ttag";
import { ClaimedAmountCard } from "src/ui/airdrop/AirdropFullyClaimed/ClaimedAmountCard";
import { DelegatedCard } from "src/ui/airdrop/AirdropFullyClaimed/DelegatedCard";

interface AirdropFullyClaimedCardProps {
  account: string | null | undefined;
}

export function AirdropFullyClaimedCard({
  account,
}: AirdropFullyClaimedCardProps): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw(
        display("flex"),
        flexDirection("flex-col"),
        textColor("text-white"),
        textAlign("text-center"),
        height("h-full"),
      )}
    >
      <div
        className={tw(
          display("flex"),
          flexDirection("flex-col"),
          padding("p-6"),
        )}
      >
        <div className={tw(textAlign("text-right"))}>
          <Tag intent={Intent.ERROR}>
            <span
              className={tw(fontWeight("font-bold"))}
            >{t`Already claimed tokens`}</span>
            <ShieldExclamationIcon height={24} className={tw(margin("ml-4"))} />
          </Tag>
        </div>
        <div
          className={tw(
            textAlign("text-left"),
            fontSize("text-3xl"),
            fontWeight("font-bold"),
            margin("mb-10"),
          )}
        >{t`Review Claim`}</div>
        <div
          className={tw(
            display("flex"),
            width("w-full"),
            justifyContent("justify-center"),
            fontSize("text-base"),
            fontWeight("font-bold"),
            margin("mb-10"),
          )}
        >
          <span
            className={tw(width("w-full", "md:w-1/2"))}
          >{t`You have already claimed the $ELFI tokens in which you were eligible for.`}</span>
        </div>
        <div
          className={tw(
            display("flex"),
            width("w-full"),
            space("space-x-10"),
            padding("px-12"),
            margin("mb-10"),
          )}
        >
          <ClaimedAmountCard account={account} />
          <DelegatedCard account={account} />
        </div>
        <div
          className={tw(
            display("flex"),
            width("w-full"),
            justifyContent("justify-center"),
            fontSize("text-base"),
            fontWeight("font-bold"),
          )}
        >
          <span
            className={tw(width("w-full", "md:w-1/2"))}
          >{t`To change your delegation, you can visit our delegate dashboard live in our main governance system.`}</span>
        </div>
      </div>
    </Card>
  );
}
