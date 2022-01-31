import React, { ReactElement } from "react";
interface LabeledStatProps {
  data: string;
  topLabel?: string;
  bottomLabel?: string;
  whiteText?: boolean;
}
export function LabeledStat(props: LabeledStatProps): ReactElement {
  const { data, topLabel, bottomLabel, whiteText } = props;

  return (
    <div className="flex flex-col px-4 py-5 sm:p-6 overflow-hidden">
      {topLabel && (
        <div>
          <dt className="text-sm font-light truncate">{topLabel}</dt>
        </div>
      )}

      <div>
        <dd className="mt-1 text-4xl font-semibold">{data}</dd>
      </div>

      {bottomLabel && (
        <div>
          <dt className="text-sm font-light truncate">{bottomLabel}</dt>
        </div>
      )}
    </div>
  );
}
