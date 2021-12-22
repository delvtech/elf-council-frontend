import { ChangeEvent, ReactElement, useCallback } from "react";

import classNames from "classnames";
import tw, {
  TTailwindString,
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
  position,
  backgroundColor,
  padding,
  inset,
} from "src/elf-tailwindcss-classnames";
import { t } from "ttag";

interface TokenInputProps {
  className?: string;
  inputClassName?: string;
  screenReaderLabel: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string | undefined;
  error?: boolean;
  disabled?: boolean;
  showMaxButton?: boolean;
  maxValue?: string;
  onChange: (newValue: string) => void;
}

export default function TokenInput({
  className,
  inputClassName,
  screenReaderLabel,
  id,
  name,
  placeholder,
  value,
  error = false,
  disabled = false,
  showMaxButton = false,
  maxValue,
  onChange,
}: TokenInputProps): ReactElement {
  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newDepositAmount = event.target.value;
      onChange(newDepositAmount);
    },
    [onChange],
  );

  return (
    <div className={className}>
      <label htmlFor={id} className={screenReaders("sr-only")}>
        {screenReaderLabel}
      </label>
      <div
        className={tw(
          position("relative"),
          pointerEvents({ "pointer-events-none": disabled }),
          opacity({ "opacity-50": disabled }),
        )}
      >
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
              borderColor("border-gray-300", {
                "focus:border-brandDarkBlue": !error,
                "focus:border-red-500": error,
                "border-red-500": error,
              }),
              borderRadius("rounded-md"),
              ringColor({
                "focus:ring-brandDarkBlue": !error,
                "focus:ring-red-500": error,
              }),
            ),
            inputClassName,
          )}
          placeholder={placeholder}
          value={value}
          onChange={onInputChange}
        />
        {showMaxButton && maxValue ? (
          <button
            className={tw(
              position("absolute"),
              backgroundColor("bg-principalRoyalBlue"),
              borderRadius("rounded-md"),
              padding("px-2", "py-1"),
              inset("top-1/2"),
              inset("right-3"),
              // TODO: Convert these to TW3.0
              "transform" as TTailwindString,
              "-translate-y-1/2" as TTailwindString,
            )}
            onClick={() => onChange(maxValue)}
            disabled={disabled}
          >
            <span
              className={tw(textColor("text-white"), fontSize("text-xs"))}
            >{t`MAX`}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
