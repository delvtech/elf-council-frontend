import tw from "src/elf-tailwindcss-classnames";

interface ButtonClassOptions {
  minimal?: boolean;
}

export function getButtonClass({
  minimal = false,
}: ButtonClassOptions): string {
  return tw(
    "inline-flex",
    "items-center",
    "px-3",
    "py-2",
    "border",
    "border-transparent",
    "text-sm",
    "leading-4",
    "font-medium",
    "rounded-md",
    minimal ? "text-blue-900" : "text-white",
    minimal ? "hover:bg-indigo-100" : "hover:bg-indigo-700",
    { "bg-indigo-600": !minimal, "shadow-sm": !minimal },
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-indigo-500"
  );
}
