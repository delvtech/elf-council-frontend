import { ChangeEvent, ReactElement } from "react";

import classNames from "classnames";
import tw, { TTailwindString } from "src/elf-tailwindcss-classnames";
import { t } from "ttag";

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
  setMax?: () => void;
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
  setMax,
  onChange,
}: NumericInputProps): ReactElement {
  return (
    <div className={className}>
      <label htmlFor={id} className={tw("sr-only")}>
        {screenReaderLabel}
      </label>
      <div
        className={tw("relative", {
          "pointer-events-none": disabled,
          "opacity-50": disabled,
        })}
      >
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
              }
            ),
            inputClassName
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {setMax ? (
          <button
            className={tw(
              "absolute",
              "bg-principalRoyalBlue",
              "rounded-md",
              "px-2",
              "py-1",
              "top-1/2",
              "right-3",
              "transform" as TTailwindString,
              "-translate-y-1/2"
            )}
            onClick={setMax}
            disabled={disabled}
          >
            <span className={tw("text-white", "text-xs")}>{t`MAX`}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
