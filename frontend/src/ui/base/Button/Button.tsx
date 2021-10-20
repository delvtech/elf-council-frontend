// See: https://tailwindui.com/components/application-ui/elements/buttons

import classNames from "classnames";
import { MouseEventHandler, ReactElement, ReactNode } from "react";
import { ButtonStyles, getButtonClass } from "src/ui/base/Button/styles";

interface ButtonProps extends ButtonStyles {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  onClick,
  disabled,
  variant,
  round,
  fill,
  children,
  className,
}: ButtonProps): ReactElement {
  const buttonClassName = getButtonClass({ variant, round, fill, disabled });

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={classNames(buttonClassName, className)}
    >
      {children}
    </button>
  );
}
