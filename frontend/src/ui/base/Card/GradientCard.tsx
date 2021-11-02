// See: https://tailwindui.com/components/application-ui/layout/panels#component-415761fd4b5592742ec78ce4c638973e

import classNames from "classnames";
import { CSSProperties, ReactElement, ReactNode } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface GradientCardProps {
  children: ReactNode;

  className?: string;
  style?: CSSProperties;
}

export default function GradientCard(props: GradientCardProps): ReactElement {
  const { className, children, style } = props;
  return (
    <div
      className={classNames(
        tw(
          "bg-gradient-to-br",
          "to-principalRoyalBlue",
          "from-principalBlue",
          "overflow-hidden",
          "shadow",
          "rounded-lg"
        ),
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
