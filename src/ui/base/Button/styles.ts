import classNames from "classnames";
import { assertNever } from "src/base/assertNever";

export enum ButtonSize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  AUTO = "AUTO",
}

// TODO: include padding?
const buttonSizes: Record<ButtonSize, string> = {
  [ButtonSize.SMALL]: classNames("h-8"),
  [ButtonSize.MEDIUM]: classNames("h-12"),
  [ButtonSize.LARGE]: classNames("h-16"),
  [ButtonSize.AUTO]: classNames("h-auto"),
};

export interface ButtonStyles {
  variant?: ButtonVariant;
  size?: ButtonSize;
  round?: boolean;
  fill?: boolean;
  disabled?: boolean;
  error?: boolean;
}

export enum ButtonVariant {
  GRADIENT = "gradient",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  WHITE = "white",
  OUTLINE_WHITE = "outlineWhite",
  OUTLINE_BLUE = "outlineBlue",
  MINIMAL = "minimal",
  PALE = "paleLily",
}

export function getButtonClass({
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  fill = false,
  round = false,
  disabled = false,
  error = false,
}: ButtonStyles): string {
  const buttonStyle = classNames(
    getHeight(size),
    getTextColor(variant),
    getShadow(variant),
    getBackground(variant, error),
    getBorder(variant),
    getBorderRadius(round),
    "inline-flex",
    "items-center",
    "px-4",
    "py-3",
    "leading-4",
    "font-bold",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-brandDarkBlue",
    { "flex-1": fill, "pointer-events-none": disabled, "opacity-50": disabled },
  );

  return buttonStyle;
}

function getHeight(size: ButtonSize): string {
  return buttonSizes[size];
}

function getShadow(variant: ButtonVariant): string | undefined {
  return variant === ButtonVariant.GRADIENT
    ? classNames("shadow-md", "hover:shadow-none")
    : classNames("shadow", "hover:shadow-none");
}

function getBackground(
  variant: ButtonVariant,
  error: boolean,
): string | undefined {
  switch (variant) {
    case ButtonVariant.PRIMARY:
      return !error
        ? classNames("bg-brandDarkBlue", "hover:bg-brandDarkBlue-dark")
        : classNames("bg-red-500", "hover:bg-red-700");

    case ButtonVariant.SECONDARY:
      return classNames("bg-hackerSky", "hover:bg-hackerSky-dark");

    case ButtonVariant.GRADIENT:
      return classNames(
        "bg-gradient-to-br",
        "from-principalBlue",
        "to-yieldBlue",
        "hover:from-principalBlue",
        "hover:to-principalBlue",
      );

    case ButtonVariant.MINIMAL:
      return classNames("hover:bg-brandLightBlue hover:bg-opacity-20");

    case ButtonVariant.OUTLINE_WHITE:
      return classNames(
        "bg-transparent",
        "hover:bg-white",
        "hover:bg-opacity-20",
      );

    case ButtonVariant.OUTLINE_BLUE:
      return classNames("bg-transparent", "hover:bg-blue-100");

    case ButtonVariant.WHITE:
      return classNames("bg-white", "hover:bg-opacity-80");

    case ButtonVariant.PALE:
      return classNames("bg-paleLily", "hover:bg-paleLily-dark");

    default: {
      assertNever(variant);
    }
  }
}

function getTextColor(variant: ButtonVariant): string {
  switch (variant) {
    case ButtonVariant.PRIMARY:
    case ButtonVariant.OUTLINE_WHITE:
    case ButtonVariant.GRADIENT:
      return classNames("text-white");

    case ButtonVariant.SECONDARY:
    case ButtonVariant.MINIMAL:
    case ButtonVariant.OUTLINE_BLUE:
      return classNames("text-brandDarkBlue-dark");

    case ButtonVariant.WHITE:
    case ButtonVariant.PALE:
      return classNames("text-principalRoyalBlue");

    default: {
      assertNever(variant);
      return classNames("text-white");
    }
  }
}

function getBorder(variant: ButtonVariant) {
  if (variant === ButtonVariant.OUTLINE_WHITE) {
    classNames("border border-white");
  }

  if (variant === ButtonVariant.OUTLINE_BLUE) {
    classNames("border border-brandDarkBlue-dark");
  }

  return null;
}

function getBorderRadius(round: boolean) {
  if (round) {
    return classNames("rounded-full");
  }
  return classNames("rounded-xl");
}
