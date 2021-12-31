// See: https://tailwindui.com/components/application-ui/elements/buttons

import { MouseEventHandler, ReactElement, ReactNode } from "react";
import classNames from "classnames";
import { ButtonStyles, getButtonClass } from "src/ui/base/Button/styles";

// TODO: download attribute? Or pass through props? Or make the base button a
//       polymorphic component that could take passthrough props and be rendered
//       as an achchor with `as="a"`?

interface AnchorButtonProps extends ButtonStyles {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  href?: string;
}

/**
 * Button for external links
 */
export default function AnchorButton({
  onClick,
  href,
  children,
  className,
  variant,
  round,
}: AnchorButtonProps): ReactElement {
  const buttonClass = getButtonClass({ variant, round });
  return (
    <a
      href={href}
      role="button"
      onClick={onClick}
      className={classNames(buttonClass, className)}
    >
      {children}
    </a>
  );
}
