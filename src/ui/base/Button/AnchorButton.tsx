// See: https://tailwindui.com/components/application-ui/elements/buttons

import {
  AnchorHTMLAttributes,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from "react";
import classNames from "classnames";
import { ButtonStyles, getButtonClass } from "src/ui/base/Button/styles";

interface AnchorButtonProps extends ButtonStyles {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  href?: string;
  target?: AnchorHTMLAttributes<unknown>["target"];
}

/**
 * Button for external links
 */
export default function AnchorButton({
  onClick,
  href,
  target,
  children,
  className,
  variant,
  round,
}: AnchorButtonProps): ReactElement {
  const buttonClass = getButtonClass({ variant, round });
  return (
    <a
      target={target}
      href={href}
      role="button"
      onClick={onClick}
      className={classNames(buttonClass, className)}
      // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
      rel={target === "_blank" ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
