// See: https://tailwindui.com/components/application-ui/elements/buttons

import { MouseEventHandler, ReactElement, ReactNode } from "react";
import { TAILWIND_BUTTON_CLASS } from "src/efi-ui/base/Button/styles";
import tw from "src/elf-tailwindcss-classnames";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;

  // TODO: Add rounded prop
}

export default function Button({
  onClick,
  children,
}: ButtonProps): ReactElement {
  return (
    <button onClick={onClick} type="button" className={TAILWIND_BUTTON_CLASS}>
      {children}
    </button>
  );
}
