import { ReactElement, ReactNode } from "react";

import tw, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  fontSize,
  fontWeight,
  padding,
  TBackgroundColor,
  textColor,
  TTextColor,
} from "src/elf-tailwindcss-classnames";

export enum Intent {
  WARNING = "warning",
  PRIMARY = "primary",
  PRIMARY_SOLID = "primary-solid",
  SUCCESS = "success",
  ERROR = "error",
}

interface TagProps {
  intent: Intent;
  children?: ReactNode;
}

const intentTextColors: Record<Intent, TTextColor> = {
  [Intent.WARNING]: "text-orange",
  [Intent.PRIMARY]: "text-yieldBlue",
  [Intent.PRIMARY_SOLID]: "text-white",
  [Intent.SUCCESS]: "text-statusGreen",
  [Intent.ERROR]: "text-deepRed",
};
export function Tag({ intent, children }: TagProps): ReactElement {
  return (
    <span
      className={tw(
        display("inline-flex"),
        alignItems("items-center"),
        padding("px-4", "py-3"),
        borderRadius("rounded-xl"),
        fontSize("text-sm"),
        fontWeight("font-medium"),
        textColor(intentTextColors[intent]),
        backgroundColor(getBackgroundColor(intent)),
      )}
    >
      {children}
    </span>
  );
}

const intentBackgroundColors: Record<Intent, TBackgroundColor> = {
  [Intent.WARNING]: "bg-lightOrange",
  [Intent.PRIMARY]: "bg-paleLily",
  [Intent.PRIMARY_SOLID]: "bg-principalRoyalBlue",
  [Intent.SUCCESS]: "bg-votingGreen",
  [Intent.ERROR]: "bg-statusRed",
};
function getBackgroundColor(intent: Intent): TBackgroundColor {
  return intentBackgroundColors[intent];
}
