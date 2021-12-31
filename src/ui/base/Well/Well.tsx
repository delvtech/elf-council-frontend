// See: https://tailwindui.com/components/application-ui/layout/panels#component-b6db9f2e4b73f313be4bd2b76633e93a

import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import tw, {
  backgroundColor,
  overflow,
  borderRadius,
  padding,
} from "src/elf-tailwindcss-classnames";

interface WellProps {
  children?: ReactNode;
  className?: string;
}
export default function Well({ className, children }: WellProps): ReactElement {
  return (
    <div
      className={tw(
        backgroundColor("bg-blue-100"),
        overflow("overflow-hidden"),
        borderRadius("rounded-2xl"),
      )}
    >
      <div className={classNames(padding("px-4", "py-5", "sm:p-6"), className)}>
        {children}
      </div>
    </div>
  );
}
