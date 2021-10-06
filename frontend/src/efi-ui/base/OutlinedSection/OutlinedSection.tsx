import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface OutlinedSectionProps {
  children?: ReactNode;
  className?: string;
}

export default function OutlinedSection({
  children,
  className,
}: OutlinedSectionProps): ReactElement {
  return (
    <div
      className={tw(
        "overflow-hidden",
        "border",
        "border-brandDarkBlue-dark",
        "rounded-lg"
      )}
    >
      <div className={classNames(tw("px-4", "py-5", "sm:p-6"), className)}>
        {children}
      </div>
    </div>
  );
}
