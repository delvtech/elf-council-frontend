// See: https://tailwindui.com/components/application-ui/headings/card-headings#component-c8f5fb604fcc6cf6614aab0bfec6a3f2

import React, { ReactElement, ReactNode } from "react";
import classnames from "classnames";

interface CardHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}
export default function CardHeader({
  title,
  description,
  action,
}: CardHeaderProps): ReactElement {
  return (
    <div
      className={classnames(
        "-ml-4",
        "-mt-4",
        "flex justify-between flex-wrap sm:flex-nowrap",
      )}
    >
      <div className="ml-4 mt-2">
        <h2 className="text-lg font-semibold leading-6 text-brandDarkBlue">
          {title}
        </h2>
        <p className="mt-1 text-sm text-left text-brandDarkBlue">
          {description}
        </p>
      </div>
      <div className="ml-4 mt-4 shrink-0">{action}</div>
    </div>
  );
}
