import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface H2Props {
  className?: string;
  children?: ReactNode;
}
export default function H2({ className, children }: H2Props): ReactElement {
  return (
    <h1
      className={classNames(
        tw("text-blue-900", "text-xl", "font-bold"),
        className
      )}
    >
      {children}
    </h1>
  );
}
