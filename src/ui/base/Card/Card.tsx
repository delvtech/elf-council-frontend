// See: https://tailwindui.com/components/application-ui/layout/panels#component-415761fd4b5592742ec78ce4c638973e

import classNames from "classnames";
import { CSSProperties, ReactElement, ReactNode } from "react";
import { assertNever } from "src/base/assertNever";

export enum CardVariant {
  GRADIENT = "gradient",
  WHITE = "white",
  BLUE = "blue",
  HACKER_SKY = "hackersky",
}

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  interactive?: boolean;
  active?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}

export default function Card(props: CardProps): ReactElement {
  const {
    className,
    variant = CardVariant.WHITE,
    interactive = false,
    active = false,
    onClick,
    children,
    style,
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

  if (interactive) {
    return (
      <button className={cardClassName} onClick={onClick} style={style}>
        {children}
      </button>
    );
  }

  return (
    <div className={cardClassName} style={style}>
      {children}
    </div>
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
