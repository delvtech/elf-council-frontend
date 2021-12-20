import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import tw, {
  overflow,
  borderWidth,
  borderColor,
  borderRadius,
  padding,
} from "src/elf-tailwindcss-classnames";

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
        overflow("overflow-hidden"),
        borderWidth("border"),
        borderColor("border-brandDarkBlue-dark"),
        borderRadius("rounded-lg"),
      )}
    >
      <div
        className={classNames(padding("px-4", "py-5", "sm:p-6"), className)}
      >
        {children}
      </div>
    </div>
  );
}
