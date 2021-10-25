import { brandedBlueGradientBackgroundClassName } from "src/ui/base/backgroundGradient";
import { assertNever } from "src/base/assertNever";
import tw from "src/elf-tailwindcss-classnames";

export enum ButtonSize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  AUTO = "AUTO",
}

// TODO: include padding?
const buttonSizes = {
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
}: ButtonStyles): string {
  const buttonSize = buttonSizes[size];
  const defaultStyling = tw(
    buttonSize,
    "inline-flex",
    "items-center",
    "px-4",
    "py-3",
    "leading-4",
    "font-bold",
    "shadow",
    "hover:shadow-lg",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-brandDarkBlue",
    round ? "rounded-full" : "rounded-md",
    { "flex-1": fill },
    { "pointer-events-none": disabled },
    { "opacity-50": disabled }
  );

  // TODO: add error styling to other variants
  const primaryButtonVariant = tw(
    defaultStyling,
    "text-white",
    { "bg-brandDarkBlue": !error, "hover:bg-brandDarkBlue-dark": !error },
    { "bg-red-500": error, "hover:bg-red-700": error }
  );

  if (!variant) {
    return defaultStyling;
  }

  switch (variant) {
    case ButtonVariant.PRIMARY:
      return primaryButtonVariant;

    case ButtonVariant.SECONDARY:
      return tw(
        defaultStyling,
        "bg-brandLightBlue",
        "text-brandDarkBlue-dark",
        "hover:bg-brandLightBlue-dark"
      );
    case ButtonVariant.GRADIENT:
      return tw(
        defaultStyling,
        brandedBlueGradientBackgroundClassName,
        "text-white",
        // dark background on hover for good contrast
        "hover:from-brandDarkBlue-dark",
        "hover:to-brandDarkBlue-dark"
      );

    case ButtonVariant.MINIMAL:
      return tw(
        defaultStyling,
        "text-brandDarkBlue-dark",
        "hover:bg-brandLightBlue",
        "hover:bg-opacity-20"
      );

    case ButtonVariant.OUTLINE_WHITE:
      return tw(
        defaultStyling,
        "border",
        "border-white",
        "text-white",
        "hover:bg-white",
        "hover:bg-opacity-20"
      );

    case ButtonVariant.OUTLINE_BLUE:
      return tw(
        defaultStyling,
        "border",
        "border-brandDarkBlue-dark",
        "text-brandDarkBlue-dark",
        "hover:bg-blue-100"
      );

    case ButtonVariant.WHITE:
      return tw(
        defaultStyling,
        "bg-white",
        "text-brandLightBlue-dark",
        "hover:bg-opacity-80"
      );

    default:
      assertNever(variant);
  }

  // This will never happen because of assertNever, but it satisfies the return type
  return defaultStyling;
}
