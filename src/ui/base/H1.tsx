import classNames from "classnames";
import { ReactElement, ReactNode } from "react";

interface H1Props {
  className?: string;
  children?: ReactNode;
}
export default function H1({ className, children }: H1Props): ReactElement {
  return (
    <h1 className={classNames("text-2xl font-bold", className)}>{children}</h1>
  );
}
