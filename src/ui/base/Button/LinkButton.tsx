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
    <Link href={link}>
      {/* There's a big discussion about how awful the Link api is for a11y
      here: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/402 the
      best thing to do for now is just ignore this rule when an anchor tag is
      the child of a Link since all a tags *should* have an href 🙁 */
      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <div
          className={classNames(
            buttonClass,
            cursor("cursor-pointer"),
            className,
          )}
        >
          {children}
        </div>
      </a>
    </Link>
  );
}
