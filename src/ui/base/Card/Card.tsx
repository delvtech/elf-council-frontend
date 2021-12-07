// See: https://tailwindui.com/components/application-ui/layout/panels#component-415761fd4b5592742ec78ce4c638973e

import classNames from "classnames";
import { CSSProperties, ReactElement, ReactNode } from "react";
import { assertNever } from "src/base/assertNever";
import tw, {
  TBackgroundColor,
  TBackgroundImage,
  TGradientColorStops,
} from "src/elf-tailwindcss-classnames";

export enum CardVariant {
  GRADIENT = "gradient",
  WHITE = "white",
  BLUE = "blue",
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
    tw(
      "overflow-hidden",
      "rounded-xl",
      "px-4",
      "py-5",
      "sm:p-6",
      ...getBackgroundColor(variant, active),
      active ? "shadow-md" : "shadow",
      {
        "hover:shadow-md": interactive,
        "focus:ring-principalRoyalBlue": interactive,
        "focus:ring-2": interactive,
      }
    ),
    className
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
  active: boolean
): (TBackgroundColor | TBackgroundImage | TGradientColorStops)[] {
  if (active) {
    return ["bg-paleLily"];
  }

  switch (variant) {
    case CardVariant.BLUE:
      return ["bg-principalRoyalBlue"];
    case CardVariant.GRADIENT:
      return ["bg-gradient-to-br", "from-brandDarkBlue", "to-brandLightBlue"];
    case CardVariant.WHITE:
      return ["bg-white"];
    default:
      assertNever(variant);
      return [];
  }
}
