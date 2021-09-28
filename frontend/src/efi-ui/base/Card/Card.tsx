// See: https://tailwindui.com/components/application-ui/layout/panels#component-415761fd4b5592742ec78ce4c638973e

import { ReactElement, ReactNode } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface CardProps {
  children: ReactNode;
}

export default function Card(props: CardProps): ReactElement {
  const { children } = props;
  return (
    <div className={tw("bg-white", "overflow-hidden", "shadow", "rounded-lg")}>
      <div className={tw("px-4", "py-5", "sm:p-6")}>{children}</div>
    </div>
  );
}
