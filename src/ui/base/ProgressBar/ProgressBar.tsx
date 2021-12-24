import { ReactElement } from "react";

interface ProgressBarProps {
  // value between 0 and 1
  progress: number;
}
export function ProgressBar(props: ProgressBarProps): ReactElement {
  const { progress } = props;

  const percentComplete = Math.round(progress * 100);

  return (
    <div className="w-full h-2 rounded-full bg-sky-300">
      <div
        style={{ width: `${percentComplete}%` }}
        className="h-full text-xs text-center text-white rounded-full bg-sky-100"
      ></div>
    </div>
  );
}
