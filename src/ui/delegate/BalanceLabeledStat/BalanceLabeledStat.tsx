import { ReactElement } from "react";
import classNames from "classnames";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import Link from "next/link";
import { t } from "ttag";

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
        <span className="text-2xl mr-2">{balance}</span>
        <ElementIcon size={IconSize.MEDIUM} />
      </div>

      {/* Label */}
      <div className="flex items-center">
        <span className="text-xl mr-2 mb-1">{label}</span>
        {tooltip && (
          <Tooltip content={t`Click to find out more.`}>
            <Link href="/resources">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <InformationCircleIcon className="h-4" />
              </a>
            </Link>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
