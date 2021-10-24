import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface LabeledStatProps {
  data: string;
  topLabel?: string;
  bottomLabel?: string;
}
export function LabeledStat(props: LabeledStatProps): ReactElement {
  const { data, topLabel, bottomLabel } = props;
  return (
    <div className={tw("px-4", "py-5", "overflow-hidden", "sm:p-6")}>
      {topLabel && (
        <dt
          className={tw("text-sm", "font-medium", "text-gray-500", "truncate")}
        >
          {topLabel}
        </dt>
      )}
      <dd className={tw("mt-1", "text-3xl", "font-semibold", "text-gray-900")}>
        {data}
      </dd>
      {bottomLabel && (
        <dt
          className={tw("text-sm", "font-medium", "text-gray-500", "truncate")}
        >
          {bottomLabel}
        </dt>
      )}
    </div>
  );
}
