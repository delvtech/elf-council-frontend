import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import tw, { fontSize, fontWeight } from "src/elf-tailwindcss-classnames";

interface H3Props {
  className?: string;
  children?: ReactNode;
}
export default function H3({ className, children }: H3Props): ReactElement {
  return (
    <h3
      className={classNames(
        tw(fontSize("text-lg"), fontWeight("font-semibold")),
        className,
      )}
    >
      {children}
    </h3>
  );
}
