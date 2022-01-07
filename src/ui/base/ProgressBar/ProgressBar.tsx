import { ReactElement } from "react";

interface ProgressBarProps {
  // value between 0 and 1
  progress: number;
  enableBar?: boolean;
}
export function ProgressBar(props: ProgressBarProps): ReactElement {
  const { progress, enableBar } = props;

  const percentComplete = Math.min(Math.floor(progress * 100), 100);

  let barPosition = 0;
  if (progress > 1) {
    barPosition = Math.round(100 * (1 / progress));
  }

  return (
    <div className="relative w-full h-2 bg-opacity-50 rounded-full bg-sky-300 ">
      <div
        style={{ width: `${percentComplete}%` }}
        className="h-full text-xs text-center text-white rounded-full bg-sky-100"
      ></div>
      {!!barPosition && enableBar && (
        <div
          style={{
            width: 3,
            height: "200%",
            left: `${barPosition}%`,
            top: "-50%",
          }}
          className="absolute top-0 h-full border border-white rounded bg-principalRoyalBlue"
        ></div>
      )}
    </div>
  );
}
