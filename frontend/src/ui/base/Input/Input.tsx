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
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function TextInput({
  className,
  screenReaderLabel,
  id,
  name,
  placeholder,
  value,
  onChange,
}: TextInputProps): ReactElement {
  return (
    <div>
      <label htmlFor="email" className="sr-only">
        {screenReaderLabel}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        className={classNames(
          tw(
            "shadow-sm",
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
