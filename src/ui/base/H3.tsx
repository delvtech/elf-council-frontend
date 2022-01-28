import classNames from "classnames";
import { ReactElement, ReactNode } from "react";

interface H3Props {
  className?: string;
  children?: ReactNode;
}
export default function H3({ className, children }: H3Props): ReactElement {
  return (
    <h3 className={classNames("text-lg font-semibold", className)}>
      {children}
    </h3>
  );
}
