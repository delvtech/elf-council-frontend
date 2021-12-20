import { ChangeEvent, ReactElement } from "react";

import classNames from "classnames";
import tw, {
  screenReaders,
  boxShadow,
  textColor,
  display,
  width,
  fontSize,
  borderColor,
  borderRadius,
  ringColor,
  pointerEvents,
  opacity,
} from "src/elf-tailwindcss-classnames";

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
      <label htmlFor={id} className={screenReaders("sr-only")}>
        {screenReaderLabel}
      </label>
      <input
        disabled={disabled}
        type="text"
        name={name}
        id={id}
        className={classNames(
          tw(
            boxShadow("shadow-sm"),
            textColor("text-black"),
            display("block"),
            width("w-full"),
            fontSize("sm:text-sm"),
            borderColor("border-gray-300"),
            borderRadius("rounded-md"),
            ringColor({
              "focus:ring-brandDarkBlue": !error,
              "focus:ring-red-500": error,
            }),
            borderColor({
              "focus:border-brandDarkBlue": !error,
              "focus:border-red-500": error,
              "border-red-500": error,
            }),
            pointerEvents({ "pointer-events-none": disabled }),
            opacity({ "opacity-50": disabled }),
          ),
          inputClassName,
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
