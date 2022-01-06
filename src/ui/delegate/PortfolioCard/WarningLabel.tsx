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
        "flex items-center bg-alertOrange rounded-md text-white leading-5 font-bold text-sm",
      )}
    >
      {children}
    </div>
  );
}

export default WarningLabel;
