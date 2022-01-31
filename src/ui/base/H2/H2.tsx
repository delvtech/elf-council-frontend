import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import tw, { fontSize, fontWeight } from "src/elf-tailwindcss-classnames";

interface H2Props {
  className?: string;
  children?: ReactNode;
}
export default function H2({ className, children }: H2Props): ReactElement {
  return (
    <h2
      className={classNames(
        tw(fontSize("text-xl"), fontWeight("font-bold")),
        className,
      )}
    >
      {children}
    </h2>
  );
}
