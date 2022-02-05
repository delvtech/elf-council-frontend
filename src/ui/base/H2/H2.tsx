import classNames from "classnames";
import { ReactElement, ReactNode } from "react";

interface H2Props {
  className?: string;
  children?: ReactNode;
}
export default function H2({ className, children }: H2Props): ReactElement {
  return (
    <h2 className={classNames("text-xl font-bold", className)}>{children}</h2>
  );
}
