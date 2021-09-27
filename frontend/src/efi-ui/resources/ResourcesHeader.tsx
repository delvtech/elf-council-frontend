import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import { t } from "ttag";

export default function ResourcesHeader(): ReactElement {
  return (
    <div className={tw("px-4", "py-5", "sm:px-6")}>
      <h3
        className={tw("text-lg", "leading-6", "font-medium", "text-gray-900")}
      >
        {t`Resources`}
      </h3>
      <p className={"mt-1 max-w-2xl text-sm text-gray-500"}>
        {t`Learn about Decision-Making and Communication among the Stakeholders of Element`}
      </p>
    </div>
  );
}
