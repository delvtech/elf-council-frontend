// See: https://tailwindui.com/components/application-ui/elements/buttons

import { MouseEventHandler, ReactElement, ReactNode } from "react";

import classNames from "classnames";
import { ButtonStyles, getButtonClass } from "src/ui/base/Button/styles";

import { Spinner } from "src/ui/base/Spinner/Spinner";

export interface ButtonProps extends ButtonStyles {
  children: ReactNode;
  className?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  onClick,
  disabled,
  variant,
  size,
  round,
  fill,
  loading = false,
  children,
  error,
  className,
}: ButtonProps): ReactElement {
  const buttonClassName = getButtonClass({
    variant,
    size,
    round,
    fill,
    disabled,
    error,
  });

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={classNames(buttonClassName, className)}
    >
      {loading ? (
        <div className="w-full justify-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
