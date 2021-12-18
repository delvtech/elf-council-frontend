import { Icon } from "@material-ui/core";
import classNames from "classnames";
import React, { ReactElement } from "react";
import tw, { TTailwindString } from "tailwindcss-classnames";

export enum IconSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface ElementIconProps {
  className?: string;
  size: IconSize;
}

/**
 * Oºo Element
 *
 * @returns svg logo
 */
export function ElementIcon({
  className,
  size = IconSize.SMALL,
}: ElementIconProps): ReactElement {
  const iconSizeClass = getIconSizeClasses(size);
  return (
    <div
      className={classNames(
        className,
        tw(iconSizeClass, "rounded-full", "bg-white", "opacity-90", "shadow")
      )}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="-5 -7 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g mask="url(#mask0)">
          <circle
            cx="30"
            cy="29"
            r="31"
            transform="rotate(65.9219 27.2771 26.4914)"
            fill="#1568CA"
          />
          <circle
            cx="29"
            cy="25"
            r="13"
            transform="rotate(65.9219 27.7559 25.6002)"
            fill="#8FD8E7"
          />
        </g>
      </svg>
    </div>
  );
}

function getIconSizeClasses(size: IconSize): TTailwindString {
  switch (size) {
    case IconSize.SMALL:
      return tw("h-4", "w-4");
    case IconSize.MEDIUM:
      return tw("h-8", "w-8");
    case IconSize.LARGE:
      return tw("h-12", "w-12");
  }
}
