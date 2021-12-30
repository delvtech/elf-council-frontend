import { ReactElement, ReactNode } from "react";
import tw, {
  TBackgroundColor,
  TTextColor,
  display,
  alignItems,
  padding,
  borderRadius,
  fontSize,
  fontWeight,
  textColor,
  backgroundColor,
  TArg,
  borderColor,
  borderWidth,
  borderStyle,
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
  minimal?: boolean;
  children?: ReactNode;
}

const intentTextColors: Record<Intent, TTextColor> = {
  [Intent.WARNING]: "text-orange",
  [Intent.PRIMARY]: "text-yieldBlue",
  [Intent.PRIMARY_SOLID]: "text-white",
  [Intent.SUCCESS]: "text-statusGreen",
  [Intent.ERROR]: "text-deepRed",
};
export function Tag({
  intent,
  minimal = false,
  children,
}: TagProps): ReactElement {
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
        backgroundColor(getBackgroundColor(intent, minimal)),
        getBorder(intent, minimal),
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
function getBackgroundColor(
  intent: Intent,
  minimal: boolean,
): TBackgroundColor {
  if (minimal) {
    return "bg-transparent";
  }

  return intentBackgroundColors[intent];
}

const intentBorderColors: Record<Intent, TArg> = {
  [Intent.WARNING]: tw(borderColor("border-orange"), borderWidth("border-2")),
  [Intent.PRIMARY]: tw(
    borderColor("border-yieldBlue"),
    borderWidth("border-2"),
  ),
  [Intent.PRIMARY_SOLID]: undefined,
  [Intent.SUCCESS]: tw(
    borderColor("border-votingGreen"),
    borderWidth("border-2"),
  ),
  [Intent.ERROR]: tw(borderColor("border-deepRed"), borderWidth("border-2")),
};
function getBorder(intent: Intent, minimal: boolean): TArg {
  if (!minimal) {
    return borderStyle("border-none");
  }

  return intentBorderColors[intent];
}
