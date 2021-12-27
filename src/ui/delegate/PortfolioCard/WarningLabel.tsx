import { ReactElement, ReactNode } from "react";
import classNames from "classnames";

interface WarningLabelProps {
  className?: string;
  children?: ReactNode;
}

function WarningLabel({
  className,
  children,
}: WarningLabelProps): ReactElement {
  return (
    <div
      className={classNames(
        className,
        "flex items-center h-12 xl:w-4/12 mr-16 bg-goldYellow rounded-md px-6 text-white leading-4 font-bold text-sm",
      )}
    >
      {children}
    </div>
  );
}

export default WarningLabel;
