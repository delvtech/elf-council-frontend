import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import tw, {
  textColor,
  fontSize,
  fontWeight,
} from "src/elf-tailwindcss-classnames";

interface H1Props {
  className?: string;
  children?: ReactNode;
}
export default function H1({ className, children }: H1Props): ReactElement {
  return (
    <h1
      className={classNames(
        tw(
          textColor("text-principalRoyalBlue"),
          fontSize("text-2xl"),
          fontWeight("font-bold"),
        ),
        className,
      )}
    >
      {children}
    </h1>
  );
}
