// See: https://tailwindui.com/components/application-ui/elements/buttons

import { MouseEventHandler, ReactElement, ReactNode } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  // TODO: Add rightIcon prop
  // TODO: Add leftIcon prop
  // TODO: Add rounded prop
}

export default function Button({
  onClick,
  children,
}: ButtonProps): ReactElement {
  return (
    <button
      onClick={onClick}
      type="button"
      className={tw(
        "inline-flex",
        "items-center",
        "px-3",
        "py-2",
        "border",
        "border-transparent",
        "shadow-sm",
        "text-sm",
        "leading-4",
        "font-medium",
        "rounded-md",
        "text-white",
        "bg-indigo-600",
        "hover:bg-indigo-700",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-indigo-500"
      )}
    >
      {children}
    </button>
  );
}
