import React, { ReactElement } from "react";
import tw, {
  textColor,
  display,
  flexDirection,
  padding,
  overflow,
  fontSize,
  fontWeight,
  textOverflow,
  margin,
} from "src/elf-tailwindcss-classnames";

interface LabeledStatProps {
  data: string;
  topLabel?: string;
  bottomLabel?: string;

  whiteText?: boolean;
}
export function LabeledStat(props: LabeledStatProps): ReactElement {
  const { data, topLabel, bottomLabel, whiteText } = props;
  const labelTextColor = whiteText
    ? textColor("text-white")
    : textColor("text-gray-500");
  const dataTextColor = whiteText
    ? textColor("text-white")
    : textColor("text-gray-900");

  return (
    <div
      className={tw(
        display("flex"),
        flexDirection("flex-col"),
        padding("px-4", "py-5", "sm:p-6"),
        overflow("overflow-hidden"),
      )}
    >
      {topLabel && (
        <div>
          <dt
            className={tw(
              labelTextColor,
              fontSize("text-sm"),
              fontWeight("font-light"),
              textOverflow("truncate"),
            )}
          >
            {topLabel}
          </dt>
        </div>
      )}

      <div>
        <dd
          className={tw(
            dataTextColor,
            margin("mt-1"),
            fontSize("text-4xl"),
            fontWeight("font-semibold"),
          )}
        >
          {data}
        </dd>
      </div>

      {bottomLabel && (
        <div>
          <dt
            className={tw(
              labelTextColor,
              fontSize("text-sm"),
              fontWeight("font-light"),
              textOverflow("truncate"),
            )}
          >
            {bottomLabel}
          </dt>
        </div>
      )}
    </div>
  );
}
