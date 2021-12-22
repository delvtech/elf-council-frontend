import classNames from "classnames";
import React, { ReactElement } from "react";
import {
  backgroundColor,
  TBackgroundColor,
  TTailwindString,
} from "src/elf-tailwindcss-classnames";
import tw from "tailwindcss-classnames";

export enum IconSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface ElementIconProps {
  className?: string;
  bgColorClassName?: TBackgroundColor;
  size: IconSize;
}

/**
 * Oºo Element
 *
 * @returns svg logo
 */
export function ElementIcon({
  className,
  bgColorClassName = "bg-white",
  size = IconSize.SMALL,
}: ElementIconProps): ReactElement {
  const iconSizeClass = getIconSizeClasses(size);
  return (
    <div
      className={classNames(
        className,
        tw(
          iconSizeClass,
          "rounded-full",
          backgroundColor(bgColorClassName),
          "opacity-90",
          "shadow",
        ),
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
      return tw("h-3", "w-3");
    case IconSize.MEDIUM:
      return tw("h-6", "w-6");
    case IconSize.LARGE:
      return tw("h-12", "w-12");
  }
}
