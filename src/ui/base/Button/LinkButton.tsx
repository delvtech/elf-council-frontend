import classNames from "classnames";
import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";
import { ButtonStyles, getButtonClass } from "src/ui/base/Button/styles";
import { cursor } from "src/elf-tailwindcss-classnames";

interface LinkButtonProps extends ButtonStyles {
  /**
   * path for next router to navigate to
   */
  link: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Button for next router links
 */
export default function LinkButton(props: LinkButtonProps): ReactElement {
  const { link, variant, round, className, children } = props;
  const buttonClass = getButtonClass({ variant, round });
  return (
    <Link href={link} passHref>
      <div
        className={classNames(buttonClass, cursor("cursor-pointer"), className)}
      >
        {children}
      </div>
    </Link>
  );
}
