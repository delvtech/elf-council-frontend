import { assertNever } from "src/base/assertNever";
import tw, {
  alignItems,
  backgroundColor,
  backgroundImage,
  backgroundOpacity,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  display,
  flex,
  fontWeight,
  gradientColorStops,
  height,
  lineHeight,
  opacity,
  outlineStyle,
  padding,
  pointerEvents,
  ringColor,
  ringOffsetWidth,
  ringWidth,
  TArg,
  textColor,
  THeight,
  TTailwindString,
} from "src/elf-tailwindcss-classnames";

export enum ButtonSize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  AUTO = "AUTO",
}

// TODO: include padding?
const buttonSizes: Record<ButtonSize, THeight> = {
  [ButtonSize.SMALL]: "h-8",
  [ButtonSize.MEDIUM]: "h-12",
  [ButtonSize.LARGE]: "h-16",
  [ButtonSize.AUTO]: "h-auto",
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
}

export function getButtonClass({
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  fill = false,
  round = false,
  disabled = false,
  error = false,
}: ButtonStyles): TTailwindString {
  const buttonStyle = tw(
    getHeight(size),
    getTextColor(variant),
    getShadow(variant),
    getBackground(variant, error),
    getBorder(variant),
    round ? borderRadius("rounded-full") : borderRadius("rounded-xl"),
    display("inline-flex"),
    alignItems("items-center"),
    padding("px-4", "py-3"),
    lineHeight("leading-4"),
    fontWeight("font-bold"),
    outlineStyle("focus:outline-none"),
    ringWidth("focus:ring-2"),
    ringOffsetWidth("focus:ring-offset-2"),
    ringColor("focus:ring-brandDarkBlue"),
    flex({ "flex-1": fill }),
    pointerEvents({ "pointer-events-none": disabled }),
    opacity({ "opacity-50": disabled }),
  );

  return buttonStyle;
}

function getHeight(size: ButtonSize): TArg {
  return height(buttonSizes[size]);
}

function getShadow(variant: ButtonVariant): TArg {
  return variant === ButtonVariant.GRADIENT
    ? boxShadow("shadow-md", "hover:shadow-none")
    : boxShadow("shadow", "hover:shadow-none");
}

function getBackground(variant: ButtonVariant, error: boolean): TArg {
  switch (variant) {
    case ButtonVariant.PRIMARY:
      return !error
        ? backgroundColor("bg-brandDarkBlue", "hover:bg-brandDarkBlue-dark")
        : backgroundColor("bg-red-500", "hover:bg-red-700");

    case ButtonVariant.SECONDARY:
      return backgroundColor("bg-hackerSky", "hover:bg-hackerSky-dark");

    case ButtonVariant.GRADIENT:
      return tw(
        backgroundImage("bg-gradient-to-br"),
        gradientColorStops(
          "from-principalBlue",
          "to-yieldBlue",
          "hover:from-principalBlue",
          "hover:to-principalBlue",
        ),
      );

    case ButtonVariant.MINIMAL:
      return tw(
        backgroundColor("hover:bg-brandLightBlue"),
        backgroundOpacity("hover:bg-opacity-20"),
      );

    case ButtonVariant.OUTLINE_WHITE:
      return tw(
        backgroundColor("bg-transparent", "hover:bg-white"),
        backgroundOpacity("hover:bg-opacity-20"),
      );

    case ButtonVariant.OUTLINE_BLUE:
      return backgroundColor("bg-transparent", "hover:bg-blue-100");

    case ButtonVariant.WHITE:
      return tw(
        backgroundColor("bg-white"),
        backgroundOpacity("hover:bg-opacity-80"),
      );

    default: {
      assertNever(variant);
    }
  }
}

function getTextColor(variant: ButtonVariant): TArg {
  switch (variant) {
    case ButtonVariant.PRIMARY:
    case ButtonVariant.OUTLINE_WHITE:
    case ButtonVariant.GRADIENT:
      return textColor("text-white");

    case ButtonVariant.SECONDARY:
    case ButtonVariant.MINIMAL:
    case ButtonVariant.OUTLINE_BLUE:
      return textColor("text-brandDarkBlue-dark");

    case ButtonVariant.WHITE:
      return textColor("text-principalRoyalBlue");

    default: {
      assertNever(variant);
      return textColor("text-white");
    }
  }
}

function getBorder(variant: ButtonVariant): TArg {
  if (variant === ButtonVariant.OUTLINE_WHITE) {
    tw(borderWidth("border"), borderColor("border-white"));
  }

  if (variant === ButtonVariant.OUTLINE_BLUE) {
    tw(borderWidth("border"), borderColor("border-brandDarkBlue-dark"));
  }

  return null;
}
