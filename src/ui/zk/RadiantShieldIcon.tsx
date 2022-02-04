import { ReactElement } from "react";
import { ShieldExclamationIcon } from "@heroicons/react/solid";
import classNames from "classnames";

interface SuccessIconProps {
  className?: string;
}

export default function SuccessIcon({
  className,
}: SuccessIconProps): ReactElement {
  return (
    <div
      className={classNames(
        "bg-opacity-10",
        "bg-topaz",
        "flex",
        "h-32",
        "items-center",
        "justify-center",
        "relative",
        "rounded-full",
        "w-32",

        "before:absolute",
        "before:bg-topaz",
        "before:h-24",
        "before:opacity-50",
        "before:rounded-full",
        "before:w-24",

        "after:absolute",
        "after:bg-topaz",
        "after:h-16",
        "after:rounded-full",
        "after:w-16",
        className,
      )}
    >
      <ShieldExclamationIcon className="relative z-10 h-10" />
    </div>
  );
}
