import { ReactElement } from "react";

import classNames from "classnames";
import { t } from "ttag";
import { InformationCircleIcon } from "@heroicons/react/solid";

import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { RESOURCES_URL } from "src/ui/resources";

interface BalanceLabeledStatProps {
  className?: string;
  tooltip?: string;
  tooltipHref?: string;
  label: string;
  balance: string;
}

export function BalanceLabeledStat(
  props: BalanceLabeledStatProps,
): ReactElement {
  const { className, tooltip, label, balance } = props;

  return (
    <div className={classNames("text-white", className)}>
      {/* Balance */}
      <div className="flex items-center">
        <span className="mr-2 text-2xl">{balance}</span>
        <ElementIcon size={IconSize.MEDIUM} />
      </div>

      {/* Label */}
      <div className="flex items-center">
        <span className="mb-1 mr-2 text-xl">{label}</span>
        {tooltip && (
          <Tooltip content={t`Click to find out more.`}>
            <a
              target="_blank"
              rel="noreferrer"
              href={RESOURCES_URL}
              className="underline"
            >
              {" "}
              <InformationCircleIcon className="h-4" />
            </a>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
