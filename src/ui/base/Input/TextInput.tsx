import { ChangeEventHandler, ReactElement } from "react";
import classNames from "classnames";

interface TextInputProps {
  containerClassName?: string;
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
  autoComplete?: string;
}

export default function TextInput({
  className,
  containerClassName,
  screenReaderLabel,
  id,
  name,
  placeholder,
  value,
  error = false,
  onChange,
  disabled = false,
  spellCheck = true,
  autoComplete = "",
}: TextInputProps): ReactElement {
  const inputBorderColor = getInputBorderColor(error);
  const ringColor = getInputRingColor(error);

  return (
    <div className={containerClassName}>
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
          "block w-full rounded-md text-black shadow-sm sm:text-sm",
          className,
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        spellCheck={spellCheck}
        autoComplete={autoComplete}
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
