// See: https://tailwindui.com/components/application-ui/elements/buttons

import { MouseEventHandler, ReactElement, ReactNode } from "react";
import { getButtonClass } from "src/efi-ui/base/Button/styles";
import tw from "src/elf-tailwindcss-classnames";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;

  minimal?: boolean;
  // TODO: Add rounded prop
}

export default function Button({
  onClick,
  children,
  minimal,
}: ButtonProps): ReactElement {
  const buttonClassName = getButtonClass({ minimal });

  return (
    <button onClick={onClick} type="button" className={buttonClassName}>
      {children}
    </button>
  );
}
