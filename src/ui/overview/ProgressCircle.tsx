import tw, {
  position,
  width,
  height,
  display,
  alignItems,
  justifyContent,
  overflow,
  borderRadius,
  textColor,
} from "src/elf-tailwindcss-classnames";
import React, { ReactElement } from "react";

interface ProgressCircleProps {
  /**
   * value from 0 - 100
   */
  percent: string | number;
}
const CIRCLE_RADIUS = 40;
export function ProgressCircle(props: ProgressCircleProps): ReactElement {
  const { percent } = props;
  const circumference = CIRCLE_RADIUS * 2 * Math.PI;
  return (
    <div
      className={tw(
        position("relative"),
        width("w-20"),
        height("h-20"),
        display("flex"),
        alignItems("items-center"),
        justifyContent("justify-center"),
        overflow("overflow-hidden"),
        borderRadius("rounded-full"),
      )}
    >
      <svg className={tw(width("w-20"), height("h-20"))}>
        <circle
          className={textColor("text-gray-300")}
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className={textColor("text-blue-600")}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={
            circumference - (Number(percent) / 100) * circumference
          }
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>
      <span
        className={tw(position("absolute"), textColor("text-blue-700"))}
      >{`${percent}%`}</span>
    </div>
  );
}
