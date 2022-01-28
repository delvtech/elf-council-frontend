import classNames from "classnames";
import React, { ReactElement, ReactNode } from "react";

interface StepsProps {
  children: ReactNode;
  className?: string;
}

export default function Steps({
  className,
  children,
}: StepsProps): ReactElement {
  return <div className={classNames("flex", className)}>{children}</div>;
}
