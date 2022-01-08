import { ReactElement, ReactNode } from "react";

import classNames from "classnames";

export enum Intent {
  WARNING = "warning",
  PRIMARY = "primary",
  PRIMARY_SOLID = "primary-solid",
  SUCCESS = "success",
  ERROR = "error",
}

interface TagProps {
  intent?: Intent;
  className?: string;
  children?: ReactNode;
}

const intentTextColors: Record<Intent, string> = {
  [Intent.WARNING]: classNames("text-orange"),
  [Intent.PRIMARY]: classNames("text-yieldBlue"),
  [Intent.PRIMARY_SOLID]: classNames("text-white"),
  [Intent.SUCCESS]: classNames("text-statusGreen"),
  [Intent.ERROR]: classNames("text-deepRed"),
};

const intentBackgroundColors: Record<Intent, string> = {
  [Intent.WARNING]: classNames("bg-lightOrange"),
  [Intent.PRIMARY]: classNames("bg-paleLily"),
  [Intent.PRIMARY_SOLID]: classNames("bg-principalRoyalBlue"),
  [Intent.SUCCESS]: classNames("bg-votingGreen"),
  [Intent.ERROR]: classNames("bg-statusRed"),
};
export function Tag({
  intent = Intent.PRIMARY,
  className,
  children,
}: TagProps): ReactElement {
  return (
    <span
      className={classNames(
        className,
        "inline-flex justify-center items-center px-4 py-3 rounded-xl text-sm font-medium",
        intentTextColors[intent],
        intentBackgroundColors[intent],
      )}
    >
      {children}
    </span>
  );
}
