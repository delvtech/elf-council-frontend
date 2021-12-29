import { ChangeEventHandler, ReactElement } from "react";
import classNames from "classnames";

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
  spellCheck?: boolean;
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
  spellCheck = true,
}: TextInputProps): ReactElement {
  const inputBorderColor = getInputBorderColor(error);
  const ringColor = getInputRingColor(error);

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {screenReaderLabel}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        className={classNames(
          inputBorderColor,
          ringColor,
          "shadow-sm text-black block w-full sm:text-sm border-gray-300 rounded-md",
          className,
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        spellCheck={spellCheck}
      />
    </div>
  );
}

function getInputBorderColor(error: boolean): string {
  const color = error
    ? "border-red-500 focus:border-red-500"
    : "focus:border-brandDarkBlue";

  return color;
}

function getInputRingColor(error: boolean): string {
  const color = error
    ? "focus:ring-red-500 focus:border-red-500"
    : "focus:ring-brandDarkBlue";

  return color;
}
