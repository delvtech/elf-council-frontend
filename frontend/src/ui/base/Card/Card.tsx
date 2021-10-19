// See: https://tailwindui.com/components/application-ui/layout/panels#component-415761fd4b5592742ec78ce4c638973e

import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface CardProps {
  children: ReactNode;

  className?: string;
}

export default function Card(props: CardProps): ReactElement {
  const { className, children } = props;
  return (
    <div
      className={classNames(
        tw(
          "bg-white",
          "overflow-hidden",
          "shadow",
          "rounded-lg",
          "px-4",
          "py-5",
          "sm:p-6"
        ),
        className
      )}
    >
      {children}
    </div>
  );
}
