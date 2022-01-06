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
        "flex items-center xl:w-4/12 xl:mr-16 bg-orange rounded-md px-6 text-white leading-4 font-bold text-sm p-2",
      )}
    >
      {children}
    </div>
  );
}

export default WarningLabel;
