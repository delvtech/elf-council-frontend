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
  textAlign,
  textDecoration,
  textOpacity,
} from "src/elf-tailwindcss-classnames";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { jt, t } from "ttag";

const retroactiveRewardsExternalLink = (
  <a
    key="retro-rewards-docs"
    href=""
    className={tw(
      textColor(
        "text-indianYellow",
        fontWeight("font-bold"),
        textDecoration("hover:underline"),
      ),
    )}
  >{t`here`}</a>
);
export function RewardsInfoCard(): ReactElement {
  return (
    <Card
      variant={CardVariant.HACKER_SKY}
      className={tw(flex("flex-1"), height("h-64"), textAlign("text-center"))}
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
            textColor("text-principalRoyalBlue"),
            textOpacity("text-opacity-60"),
            margin("mb-2"),
          )}
        >{t`Rewards`}</div>
        <div className={tw(flex("flex-1"))}>
          <div
            className={tw(
              textColor("text-gray-500"),
              display("flex"),
              flexDirection("flex-col"),
              alignItems("items-center"),
            )}
          >
            <span
              className={tw(margin("mb-4"))}
            >{jt`To learn more about what factors into our retroactive rewards ${retroactiveRewardsExternalLink}.`}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
