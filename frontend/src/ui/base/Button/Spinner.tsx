import { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";

export function Spinner(): ReactElement {
  return (
    <div
      style={{ borderTopColor: "transparent" }}
      className={tw(
        "w-8",
        "h-8",
        "border-2",
        "m-auto",
        "border-blue-400",
        "border-solid",
        "rounded-full",
        "animate-spin"
      )}
    ></div>
  );
}
