import tw from "src/elf-tailwindcss-classnames";
import React, { ReactElement } from "react";

interface ProgressCircleProps {
  /**
   * value from 0 - 100
   */
  percent: string | number;
}
export function ProgressCircle(props: ProgressCircleProps): ReactElement {
  const { percent } = props;
  const circumference = 40 * 2 * Math.PI;
  return (
    <div
      className={tw(
        "relative",
        "w-20",
        "h-20",
        "flex",
        "items-center",
        "justify-center",
        "overflow-hidden",
        "rounded-full"
      )}
    >
      <svg className={tw("w-20", "h-20")}>
        <circle
          className={tw("text-gray-300")}
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className={tw("text-blue-600")}
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
      <span className={tw("absolute", "text-blue-700")}>{`${percent}%`}</span>
    </div>
  );
}
