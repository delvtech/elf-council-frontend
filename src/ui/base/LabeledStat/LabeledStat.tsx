import classNames from "classnames";
import React, { ReactElement } from "react";
interface LabeledStatProps {
  data: string;
  topLabel?: string;
  bottomLabel?: string;
  textClassName?: string;
}

export function LabeledStat(props: LabeledStatProps): ReactElement {
  const { data, topLabel, bottomLabel, textClassName } = props;

  return (
    <div className="flex flex-col overflow-hidden px-4 py-5 sm:p-6">
      {topLabel && (
        <div>
          <dt className="truncate text-sm font-light">{topLabel}</dt>
        </div>
      )}

      <div>
        <dd
          className={classNames(textClassName, "mt-1 text-4xl font-semibold")}
        >
          {data}
        </dd>
      </div>

      {bottomLabel && (
        <div>
          <dt className="truncate text-sm font-light">{bottomLabel}</dt>
        </div>
      )}
    </div>
  );
}
