import { ChangeEvent, ReactElement } from "react";

import classNames from "classnames";
import tw from "src/elf-tailwindcss-classnames";

interface NumericInputProps {
  className?: string;
  inputClassName?: string;
  screenReaderLabel: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string | undefined;
  error?: boolean;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function NumericInput({
  className,
  inputClassName,
  screenReaderLabel,
  id,
  name,
  placeholder,
  value,
  error = false,
  disabled = false,
  onChange,
}: NumericInputProps): ReactElement {
  return (
    <div className={className}>
      <label htmlFor={id} className={tw("sr-only")}>
        {screenReaderLabel}
      </label>
      <input
        disabled={disabled}
        type="text"
        name={name}
        id={id}
        className={classNames(
          tw(
            "shadow-sm",
            "text-black",
            "block",
            "w-full",
            "sm:text-sm",
            "border-gray-300",
            "rounded-md",
            {
              "focus:ring-brandDarkBlue": !error,
              "focus:border-brandDarkBlue": !error,
              "focus:ring-red-500": error,
              "focus:border-red-500": error,
              "border-red-500": error,
              "pointer-events-none": disabled,
              "opacity-50": disabled,
            }
          ),
          inputClassName
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
