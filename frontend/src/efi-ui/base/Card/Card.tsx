// See: https://tailwindui.com/components/application-ui/headings/card-headings

import { ReactElement, ReactNode } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface CardProps {
  children: ReactNode;
}

export default function Card(props: CardProps): ReactElement {
  const { children } = props;
  return (
    <div
      className={tw(
        "bg-white",
        "px-4",
        "py-5",
        "border-b",
        "border-gray-200",
        "sm:px-6"
      )}
    >
      {children}
    </div>
  );
}
