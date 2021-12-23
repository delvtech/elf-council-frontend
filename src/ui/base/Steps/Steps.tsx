import classNames from "classnames";
import React, { ReactElement, ReactNode } from "react";
import tw, { display } from "src/elf-tailwindcss-classnames";

interface StepsProps {
  children: ReactNode;
  className?: string;
}

export default function Steps({
  className,
  children,
}: StepsProps): ReactElement {
  return (
    <div className={classNames(tw(display("flex")), className)}>{children}</div>
  );
}
