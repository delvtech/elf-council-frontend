import { ChangeEvent, ReactElement } from "react";

import classNames from "classnames";
import tw from "src/elf-tailwindcss-classnames";

interface NumericInputProps {
  className?: string;
  screenReaderLabel: string;
  htmlFor: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function NumericInput({
  className,
  screenReaderLabel,
  htmlFor,
  id,
  name,
  placeholder,
  value,
  onChange,
}: NumericInputProps): ReactElement {
  return (
    <div>
      <label htmlFor={htmlFor} className="sr-only">
        {screenReaderLabel}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        className={classNames(
          tw(
            "shadow-sm",
            "text-black",
            "focus:ring-brandDarkBlue",
            "focus:border-brandDarkBlue",
            "block",
            "w-full",
            "sm:text-sm",
            "border-gray-300",
            "rounded-md"
          ),
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
