import React, { ReactElement } from "react";

interface LabeledStatProps {
  data: string;
  topLabel?: string;
  bottomLabel?: string;
}
export function LabeledStat(props: LabeledStatProps): ReactElement {
  const { data, topLabel, bottomLabel } = props;
  return (
    <div className="px-4 py-5 overflow-hidden sm:p-6">
      {topLabel && (
        <dt className="text-sm font-medium text-gray-500 truncate">
          {topLabel}
        </dt>
      )}
      <dd className="mt-1 text-3xl font-semibold text-gray-900">{data}</dd>
      {bottomLabel && (
        <dt className="text-sm font-medium text-gray-500 truncate">
          {bottomLabel}
        </dt>
      )}
    </div>
  );
}
