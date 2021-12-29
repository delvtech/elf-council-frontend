import { ChangeEventHandler, ReactElement } from "react";

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
} from "src/elf-tailwindcss-classnames";

interface TextInputProps {
  className?: string;
  screenReaderLabel: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string | undefined;
  error?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export default function TextInput({
  className,
  screenReaderLabel,
  id,
  name,
  placeholder,
  value,
  error = false,
  onChange,
  disabled = false,
}: TextInputProps): ReactElement {
  const inputBorderColor = getInputBorderColor(error);
  const ringColor = getInputRingColor(error);

  return (
    <div>
      <label htmlFor={id} className={screenReaders("sr-only")}>
        {screenReaderLabel}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        className={classNames(
          tw(
            inputBorderColor,
            ringColor,
            boxShadow("shadow-sm"),
            textColor("text-black"),
            display("block"),
            width("w-full"),
            fontSize("sm:text-sm"),
            borderColor("border-gray-300"),
            borderRadius("rounded-md"),
          ),
          className,
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

function getInputBorderColor(error: boolean): TTailwindString {
  const color = error
    ? borderColor("border-red-500", "focus:border-red-500")
    : borderColor("focus:border-brandDarkBlue");

  return color;
}

function getInputRingColor(error: boolean): TTailwindString {
  const color = error
    ? tw(ringColor("focus:ring-red-500"), borderColor("focus:border-red-500"))
    : ringColor("focus:ring-brandDarkBlue");

  return color;
}
