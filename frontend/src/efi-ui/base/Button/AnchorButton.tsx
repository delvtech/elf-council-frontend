// See: https://tailwindui.com/components/application-ui/elements/buttons

import { MouseEventHandler, ReactElement, ReactNode } from "react";
import { getButtonClass } from "src/efi-ui/base/Button/styles";

interface AnchorButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  href?: string;
  minimal?: boolean;
  // TODO: Add rounded prop
}

export default function AnchorButton({
  onClick,
  href,
  children,
  minimal,
}: AnchorButtonProps): ReactElement {
  const buttonClass = getButtonClass({ minimal });
  return (
    <a
      href={href}
      role="button"
      onClick={onClick}
      className={buttonClass}
    >
      {children}
    </a>
  );
}
