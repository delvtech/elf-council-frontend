// See: https://tailwindui.com/components/application-ui/layout/panels#component-415761fd4b5592742ec78ce4c638973e

import classNames from "classnames";
import { CSSProperties, ReactElement, ReactNode } from "react";
import { assertNever } from "src/base/assertNever";
import tw, {
  backgroundColor,
  backgroundImage,
  gradientColorStops,
  boxShadow,
  overflow,
  borderRadius,
  padding,
  ringColor,
  ringWidth,
  TArg,
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
      getBackgroundColor(variant, active),
      boxShadow(active ? "shadow-md" : "shadow"),
      overflow("overflow-hidden"),
      borderRadius("rounded-xl"),
      padding("px-4", "py-5", "sm:p-6"),
      boxShadow({ "hover:shadow-md": interactive }),
      ringColor({ "focus:ring-principalRoyalBlue": interactive }),
      ringWidth({ "focus:ring-2": interactive }),
    ),
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

function getBackgroundColor(variant: CardVariant, active: boolean): TArg {
  if (active) {
    return backgroundColor("bg-paleLily");
  }

  switch (variant) {
    case CardVariant.BLUE:
      return tw(
        backgroundImage("bg-gradient-to-br"),
        gradientColorStops(
          "from-principalRoyalBlue",
          "via-yieldBlue",
          "to-principalRoyalBlue",
        ),
      );
    case CardVariant.GRADIENT:
      return tw(
        backgroundImage("bg-gradient-to-br"),
        gradientColorStops(
          "from-principalRoyalBlue",
          "via-principalRoyalBlue",
          "to-principalBlue",
        ),
      );
    case CardVariant.WHITE:
      return backgroundColor("bg-white");
    default:
      assertNever(variant);
  }
}
