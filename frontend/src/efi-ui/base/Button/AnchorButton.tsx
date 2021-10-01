// See: https://tailwindui.com/components/application-ui/elements/buttons

import { MouseEventHandler, ReactElement, ReactNode } from "react";
import { TAILWIND_BUTTON_CLASS } from "src/efi-ui/base/Button/styles";

interface AnchorButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  href?: string;
  // TODO: Add rounded prop
}

export default function AnchorButton({
  onClick,
  href,
  children,
}: AnchorButtonProps): ReactElement {
  return (
    <a
      href={href}
      role="button"
      onClick={onClick}
      className={TAILWIND_BUTTON_CLASS}
    >
      {children}
    </a>
  );
}
