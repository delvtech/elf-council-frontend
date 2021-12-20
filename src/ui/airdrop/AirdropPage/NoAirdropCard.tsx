import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";

export function NoAirdropCard(): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw(
        "flex",
        "flex-col",
        "text-white",
        "text-center",
        "h-full",
        "justify-center",
        "items-center"
      )}
    >
      <div className={tw("text-center", "text-sm", "mb-4")}>
        <div
          className={tw("font-semibold", "tracking-wider")}
        >{t`Sorry, no airdrop found for this wallet.`}</div>
      </div>
      <div
        className={tw("text-2xl", "font-bold", "text-white", "mb-6")}
      >{t`0 ELFI`}</div>
    </Card>
  );
}
