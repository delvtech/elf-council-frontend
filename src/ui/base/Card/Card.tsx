// See: https://tailwindui.com/components/application-ui/layout/panels#component-415761fd4b5592742ec78ce4c638973e

import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import tw, { TTailwindString } from "src/elf-tailwindcss-classnames";

export enum CardVariant {
  GRADIENT = "gradient",
  WHITE = "white",
  BLUE = "blue",
}

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
}

const variantBackgrounds: Record<CardVariant, TTailwindString> = {
  [CardVariant.GRADIENT]: tw(
    "bg-gradient-to-br",
    "from-brandDarkBlue",
    "to-brandLightBlue"
  ),
  [CardVariant.BLUE]: tw("bg-brandDarkBlue"),
  [CardVariant.WHITE]: tw("bg-white"),
};
export default function Card(props: CardProps): ReactElement {
  const { className, variant = CardVariant.WHITE, children } = props;

  const variantBackground = variantBackgrounds[variant];

  return (
    <div
      className={classNames(
        tw(
          variantBackground,
          "overflow-hidden",
          "shadow",
          "rounded-xl",
          "px-4",
          "py-5",
          "sm:p-6"
        ),
        className
      )}
    >
      {children}
    </div>
  );
}
