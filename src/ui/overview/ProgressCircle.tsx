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
    <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
      <svg className="h-20 w-20">
        <circle
          className="text-gray-300"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className="text-blue-600"
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
      <span className="absolute text-blue-700">{`${percent}%`}</span>
    </div>
  );
}
