// See: https://tailwindui.com/components/application-ui/layout/panels#component-415761fd4b5592742ec78ce4c638973e

import classNames from "classnames";
import { ElementType, ReactElement } from "react";
import { assertNever } from "src/base/assertNever";
import { PolymorphicComponentProps } from "src/@types/helper";

export enum CardVariant {
  GRADIENT = "gradient",
  WHITE = "white",
  BLUE = "blue",
  HACKER_SKY = "hackersky",
}

export interface CardProps {
  variant?: CardVariant;
  interactive?: boolean;
  active?: boolean;
}

type PolymorphicCardProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, CardProps>;

export default function Card<C extends ElementType>(
  props: PolymorphicCardProps<C>,
): ReactElement {
  const {
    as,
    className,
    variant = CardVariant.WHITE,
    interactive = false,
    active = false,
    children,
    ...tagProps
  } = props;

  const cardClassName = classNames(
    getBackgroundColor(variant, active, interactive),
    "overflow-hidden rounded-xl px-4 py-5 sm:p-6",
    active ? "shadow-md" : "shadow",
    {
      "hover:shadow-md": interactive,
      "focus:ring-principalRoyalBlue": interactive,
      "focus:ring-2": interactive,
    },
    className,
  );

  const Tag = as || (interactive ? "button" : "div");

  return (
    <Tag className={cardClassName} {...tagProps}>
      {children}
    </Tag>
  );
}

function getBackgroundColor(
  variant: CardVariant,
  active: boolean,
  interactive: boolean,
): string {
  if (active) {
    return "bg-hackerSky";
  }

  switch (variant) {
    case CardVariant.BLUE:
      return "bg-gradient-to-br from-principalRoyalBlue via-yieldBlue to-principalRoyalBlue";
    case CardVariant.GRADIENT:
      return "bg-gradient-to-br from-principalRoyalBlue via-principalRoyalBlue to-principalBlue";
    case CardVariant.WHITE:
      return "bg-white";
    case CardVariant.HACKER_SKY:
      return classNames("bg-hackerSky", { "hover:bg-white": interactive });
    default:
      assertNever(variant);
      return "";
  }
}
