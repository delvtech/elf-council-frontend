import tw, { THeight, TTailwindString } from "src/elf-tailwindcss-classnames";

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
  outlined?: boolean;
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
  outlined = false,
  round = false,
  disabled = false,
  error = false,
}: ButtonStyles): TTailwindString {
  const buttonSize = buttonSizes[size];

  if (!variant) {
    return tw("btn");
  }

  return tw("btn", buttonSize, {
    "btn-primary": variant === ButtonVariant.PRIMARY,
    "btn-secondary": variant === ButtonVariant.SECONDARY,
    "btn-gradient": variant === ButtonVariant.GRADIENT,
    "btn-minimal": variant === ButtonVariant.MINIMAL,
    "flex-1": fill,
    "btn-outlined": outlined,
    "btn-error": error,
    "btn-round": round,
    "btn-disabled": disabled,
  });
}
