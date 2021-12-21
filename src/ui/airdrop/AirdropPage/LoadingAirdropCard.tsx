import React, { ReactElement } from "react";
import tw, {
  display,
  flexDirection,
  textColor,
  textAlign,
  height,
  justifyContent,
  alignItems,
  fontSize,
  margin,
  animation,
  fontWeight,
  letterSpacing,
} from "src/elf-tailwindcss-classnames";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";

export function LoadingAirdropCard(): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw(
        display("flex"),
        flexDirection("flex-col"),
        textColor("text-white"),
        textAlign("text-center"),
        height("h-full"),
        justifyContent("justify-center"),
        alignItems("items-center"),
      )}
    >
      <div
        className={tw(
          textAlign("text-center"),
          fontSize("text-sm"),
          margin("mb-4"),
          animation("animate-pulse"),
          alignItems("items-center"),
          justifyContent("justify-center"),
          display("flex"),
          flexDirection("flex-col"),
        )}
      >
        <div
          className={tw(
            fontWeight("font-semibold"),
            letterSpacing("tracking-wider"),
          )}
        >{t`Checking for airdrop rewards...`}</div>
      </div>
    </Card>
  );
}
