// See: https://tailwindui.com/components/application-ui/elements/buttons

import { MouseEventHandler, ReactElement, ReactNode } from "react";
import { ButtonStyles, getButtonClass } from "src/ui/base/Button/styles";

interface AnchorButtonProps extends ButtonStyles {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  href?: string;
}

export default function AnchorButton({
  onClick,
  href,
  children,
  variant,
  round,
}: AnchorButtonProps): ReactElement {
  const buttonClass = getButtonClass({ variant, round });
  return (
    <a href={href} role="button" onClick={onClick} className={buttonClass}>
      {children}
    </a>
  );
}
