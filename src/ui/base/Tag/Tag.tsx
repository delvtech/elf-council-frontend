import { ReactElement, ReactNode } from "react";
import tw, {
  TBackgroundColor,
  TBorders,
  TTextColor,
} from "src/elf-tailwindcss-classnames";

export enum Intent {
  SUCCESS = "success",
  ERROR = "error",
}

interface TagProps {
  intent: Intent;
  minimal?: boolean;
  children?: ReactNode;
}

const intentTextColors: Record<Intent, TTextColor> = {
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
        "inline-flex",
        "items-center",
        "px-4",
        "py-3",
        "rounded-xl",
        "text-sm",
        "font-medium",
        intentTextColors[intent],
        getBackgroundColor(intent, minimal),
        ...getBorder(intent, minimal)
      )}
    >
      {children}
    </span>
  );
}

const intentBackgroundColors: Record<Intent, TBackgroundColor> = {
  [Intent.SUCCESS]: "bg-votingGreen",
  [Intent.ERROR]: "bg-statusRed",
};
function getBackgroundColor(
  intent: Intent,
  minimal: boolean
): TBackgroundColor {
  if (minimal) {
    return "bg-transparent";
  }

  return intentBackgroundColors[intent];
}

const intentBorderColors: Record<Intent, TBorders[]> = {
  [Intent.SUCCESS]: ["border-votingGreen", "border-2"],
  [Intent.ERROR]: ["border-deepRed", "border-2"],
};
function getBorder(intent: Intent, minimal: boolean): TBorders[] {
  if (!minimal) {
    return ["border-none"];
  }

  return intentBorderColors[intent];
}
