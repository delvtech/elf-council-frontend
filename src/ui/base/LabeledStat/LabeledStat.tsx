import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface LabeledStatProps {
  data: string;
  topLabel?: string;
  bottomLabel?: string;

  whiteText?: boolean;
}
export function LabeledStat(props: LabeledStatProps): ReactElement {
  const { data, topLabel, bottomLabel, whiteText } = props;
  const labelTextColor = whiteText ? tw("text-white") : tw("text-gray-500");
  const dataTextColor = whiteText ? tw("text-white") : tw("text-gray-900");

  return (
    <div
      className={tw(
        "flex",
        "flex-col",
        "px-4",
        "py-5",
        "overflow-hidden",
        "sm:p-6"
      )}
    >
      {topLabel && (
        <div>
          <dt
            className={tw(labelTextColor, "text-sm", "font-light", "truncate")}
          >
            {topLabel}
          </dt>
        </div>
      )}

      <div>
        <dd className={tw(dataTextColor, "mt-1", "text-4xl", "font-semibold")}>
          {data}
        </dd>
      </div>

      {bottomLabel && (
        <div>
          <dt
            className={tw(labelTextColor, "text-sm", "font-light", "truncate")}
          >
            {bottomLabel}
          </dt>
        </div>
      )}
    </div>
  );
}
