import classNames from "classnames";
import { ChangeEventHandler, ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface TextInputProps {
  className?: string;
  screenReaderLabel: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string | undefined;
  error?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
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
}: TextInputProps): ReactElement {
  const intent = error
    ? tw("border-red-500", "focus:ring-red-500", "focus:border-red-500")
    : tw("focus:ring-brandDarkBlue", "focus:border-brandDarkBlue");

  return (
    <div>
      <label htmlFor={id} className={tw("sr-only")}>
        {screenReaderLabel}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        className={classNames(
          tw(
            intent,
            "shadow-sm",
            "text-black",
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
