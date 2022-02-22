import classNames from "classnames";
import Image from "next/image";
import { t } from "ttag";
import React, { ReactElement } from "react";

export enum IconSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface ElementIconProps {
  className?: string;
  size: IconSize;

  /**
   * Set this to true if displaying the icon inside a block of text,
   *  eg: when using with jt, example: jt`This is a ${clickableElement}`
   */
  inline?: boolean;
}

/**
 * Oºo Element
 *
 * @returns svg logo
 */
export function ElementIcon({
  className,
  inline = false,
  size = IconSize.SMALL,
}: ElementIconProps): ReactElement {
  const iconElement = (
    <div
      className={classNames(
        className,
        "flex flex-shrink-0 items-center justify-center rounded-full bg-white p-0.5 opacity-90 shadow",
      )}
    >
      <Image
        height={IconHeight[size]}
        width={IconWidth[size]}
        src="/assets/ElementLogo--dark.svg"
        alt={t`Element Council`}
      />
    </div>
  );

  if (inline) {
    return (
      <span className="mx-1 inline-block align-middle">{iconElement}</span>
    );
  }

  return iconElement;
}

const IconHeight: Record<IconSize, string> = {
  [IconSize.SMALL]: "12",
  [IconSize.MEDIUM]: "24",
  [IconSize.LARGE]: "48",
};
const IconWidth: Record<IconSize, string> = {
  [IconSize.SMALL]: "12",
  [IconSize.MEDIUM]: "24",
  [IconSize.LARGE]: "48",
};
