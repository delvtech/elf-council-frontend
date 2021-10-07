import classNames from "classnames";
import { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface TextInputProps {
  className?: string;
  screenReaderLabel: string;
  id: string;
  name: string;
  placeholder?: string;
}

export default function TextInput({
  className,
  screenReaderLabel,
  id,
  name,
  placeholder,
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
            "focus:ring-indigo-500",
            "focus:border-indigo-500",
            "block",
            "w-full",
            "sm:text-sm",
            "border-gray-300",
            "rounded-md"
          ),
          className
        )}
        placeholder={placeholder}
      />
    </div>
  );
}
