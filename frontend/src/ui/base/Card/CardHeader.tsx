// See: https://tailwindui.com/components/application-ui/headings/card-headings#component-c8f5fb604fcc6cf6614aab0bfec6a3f2

import React, { ReactElement, ReactNode } from "react";
import tw from "src/elf-tailwindcss-classnames";

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
      className={tw(
        "-ml-4",
        "-mt-4",
        "flex",
        "justify-between",
        "items-center",
        "flex-wrap",
        "sm:flex-nowrap"
      )}
    >
      <div className={tw("ml-4", "mt-4")}>
        <h2
          className={tw(
            "text-lg",
            "font-semibold",
            "leading-6",
            "font-medium",
            "text-brandDarkBlue-dark"
          )}
        >
          {title}
        </h2>
        <p className={tw("mt-1", "text-sm", "text-gray-500")}>{description}</p>
      </div>
      <div className={tw("ml-4", "mt-4", "flex-shrink-0")}>{action}</div>
    </div>
  );
}
