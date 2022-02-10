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
        "flex items-center rounded-md bg-alertOrange text-sm font-bold leading-5 text-white",
      )}
    >
      {children}
    </div>
  );
}

export default WarningLabel;
