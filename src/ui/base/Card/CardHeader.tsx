// See: https://tailwindui.com/components/application-ui/headings/card-headings#component-c8f5fb604fcc6cf6614aab0bfec6a3f2

import React, { ReactElement, ReactNode } from "react";
import tw, {
  display,
  justifyContent,
  alignItems,
  flexWrap,
  margin,
  fontSize,
  fontWeight,
  lineHeight,
  textColor,
  flexShrink,
} from "src/elf-tailwindcss-classnames";
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
        tw(
          display("flex"),
          justifyContent("justify-between"),
          alignItems("items-center"),
          flexWrap("flex-wrap", "sm:flex-nowrap"),
        ),
      )}
    >
      <div className={margin("ml-4", "mt-4")}>
        <h2
          className={tw(
            fontSize("text-lg"),
            fontWeight("font-semibold", "font-medium"),
            lineHeight("leading-6"),
            textColor("text-brandDarkBlue-dark"),
          )}
        >
          {title}
        </h2>
        <p
          className={tw(
            margin("mt-1"),
            fontSize("text-sm"),
            textColor("text-gray-500"),
          )}
        >
          {description}
        </p>
      </div>
      <div className={tw(margin("ml-4", "mt-4"), flexShrink("shrink-0"))}>
        {action}
      </div>
    </div>
  );
}
