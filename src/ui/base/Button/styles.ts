import { assertNever } from "src/base/assertNever";
import tw, {
  TBackgroundColor,
  TPseudoClasses,
  TBoxShadow,
  THeight,
  TBackgroundImage,
  TGradientColorStops,
  TTextColor,
  TBorders,
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
    getHeight(size),
    getTextColor(variant),
    ...getShadow(variant),
    ...getBackground(variant, error),
    ...getBorder(variant),
    round ? "rounded-full" : "rounded-xl",
    { "flex-1": fill },
    { "pointer-events-none": disabled },
    { "opacity-50": disabled }
  );

  return buttonStyle;
}

function getHeight(size: ButtonSize): THeight {
  return buttonSizes[size];
}

function getShadow(variant: ButtonVariant): (TBoxShadow | TPseudoClasses)[] {
  if (variant === ButtonVariant.GRADIENT) {
    return ["shadow-md", "hover:shadow-none"];
  }
  return ["shadow", "hover:shadow-none"];
}

function getBackground(
  variant: ButtonVariant,
  error: boolean
): (
  | TBackgroundColor
  | TBackgroundImage
  | TGradientColorStops
  | TPseudoClasses
)[] {
  switch (variant) {
    case ButtonVariant.PRIMARY:
      return [
        !error ? "bg-brandDarkBlue" : "bg-red-500",
        !error ? "hover:bg-brandDarkBlue-dark" : "hover:bg-red-700",
      ];

    case ButtonVariant.SECONDARY:
      return ["bg-brandLightBlue", "hover:bg-brandLightBlue-dark"];

    case ButtonVariant.GRADIENT:
      return [
        "bg-gradient-to-br",
        "from-principalBlue",
        "to-yieldBlue",
        // light background on hover for good contrast
        "hover:from-principalBlue",
        "hover:to-principalBlue",
      ];

    case ButtonVariant.MINIMAL:
      return ["hover:bg-brandLightBlue", "hover:bg-opacity-20"];

    case ButtonVariant.OUTLINE_WHITE:
      return ["bg-transparent", "hover:bg-white", "hover:bg-opacity-20"];

    case ButtonVariant.OUTLINE_BLUE:
      return ["bg-transparent", "hover:bg-blue-100"];

    case ButtonVariant.WHITE:
      return ["bg-white", "hover:bg-opacity-80"];

    default: {
      assertNever(variant);
      // This will never happen because of assertNever, but it satisfies the return type
      return [];
    }
  }
}

function getTextColor(variant: ButtonVariant): TTextColor {
  switch (variant) {
    case ButtonVariant.PRIMARY:
    case ButtonVariant.OUTLINE_WHITE:
    case ButtonVariant.GRADIENT:
      return "text-white";

    case ButtonVariant.SECONDARY:
    case ButtonVariant.MINIMAL:
    case ButtonVariant.OUTLINE_BLUE:
      return "text-brandDarkBlue-dark";

    case ButtonVariant.WHITE:
      return "text-brandLightBlue-dark";

    default: {
      assertNever(variant);
      return "text-white";
    }
  }
}

function getBorder(variant: ButtonVariant): TBorders[] {
  if (variant === ButtonVariant.OUTLINE_WHITE) {
    return ["border", "border-white"];
  }

  if (variant === ButtonVariant.OUTLINE_BLUE) {
    return ["border", "border-brandDarkBlue-dark"];
  }

  // No border by default
  return [];
}
