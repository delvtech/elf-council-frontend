// See: https://tailwindui.com/components/application-ui/layout/panels#component-415761fd4b5592742ec78ce4c638973e

import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface GradientCardProps {
  children: ReactNode;

  className?: string;
}

export default function GradientCard(props: GradientCardProps): ReactElement {
  const { className, children } = props;
  return (
    <div
      className={tw(
        "bg-gradient-to-br",
        "from-brandDarkBlue",
        "to-brandLightBlue",
        "overflow-hidden",
        "shadow",
        "rounded-lg"
      )}
    >
      <div className={classNames(className)}>{children}</div>
    </div>
  );
}
