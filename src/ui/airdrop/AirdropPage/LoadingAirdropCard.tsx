import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";

export function LoadingAirdropCard(): ReactElement {
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
      <div
        className={tw(
          "text-center",
          "text-sm",
          "mb-4",
          "animate-pulse",
          "items-center",
          "justify-center",
          "flex",
          "flex-col"
        )}
      >
        <div
          className={tw("font-semibold", "tracking-wider")}
        >{t`Checking for airdrop rewards...`}</div>
      </div>
    </Card>
  );
}
