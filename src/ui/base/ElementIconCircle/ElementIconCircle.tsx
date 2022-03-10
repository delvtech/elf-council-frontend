import classNames from "classnames";
import React, { ReactElement } from "react";
import ElementIcon, { IconSize } from "src/ui/svg/ElementIcon/ElementIcon";

export { IconSize };

interface ElementIconCircleProps {
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
export function ElementIconCircle({
  className,
  inline = false,
  size = IconSize.SMALL,
}: ElementIconCircleProps): ReactElement {
  const Tag = inline ? "span" : "div";

  const iconElement = (
    <Tag
      className={classNames(
        className,
        "flex w-max flex-shrink-0 items-center justify-center rounded-full bg-white p-0.5 opacity-90 shadow",
      )}
    >
      <ElementIcon height={IconHeight[size]} width={IconWidth[size]} />
    </Tag>
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
