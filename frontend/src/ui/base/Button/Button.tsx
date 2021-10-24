// See: https://tailwindui.com/components/application-ui/elements/buttons

import { MouseEventHandler, ReactElement, ReactNode } from "react";

import classNames from "classnames";
import tw from "src/elf-tailwindcss-classnames";
import { ButtonStyles, getButtonClass } from "src/ui/base/Button/styles";

import { Spinner } from "./Spinner";

interface ButtonProps extends ButtonStyles {
  children: ReactNode;
  className?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  onClick,
  disabled,
  variant,
  round,
  fill,
  loading = false,
  children,
  error,
  className,
}: ButtonProps): ReactElement {
  const buttonClassName = getButtonClass({
    variant,
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
        <div className={tw("w-full", "justify-center")}>
          <Spinner />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
