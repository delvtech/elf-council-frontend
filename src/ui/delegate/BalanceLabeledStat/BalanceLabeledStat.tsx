import { ReactElement, useState, MouseEvent } from "react";
import { Tooltip } from "@material-ui/core";
import classNames from "classnames";
import tw from "src/elf-tailwindcss-classnames";
import { t } from "ttag";
import Link from "next/link";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";

interface BalanceLabeledStatProps {
  className?: string;
  tooltip?: string;
  tooltipHref?: string;
  label: string;
  balance: string;
}

export function BalanceLabeledStat(
  props: BalanceLabeledStatProps
): ReactElement {
  const { className, tooltip, tooltipHref, label, balance } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const enableTooltip = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowTooltip(true);
  };
  const disableTooltip = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  const tooltipIcon = tooltipHref ? (
    <Link href={tooltipHref} passHref>
      <QuestionMarkCircleIcon className={tw("h-5")} />
    </Link>
  ) : (
    <QuestionMarkCircleIcon className={tw("h-5")} />
  );

  return (
    <div className={classNames(tw("text-white"), className)}>
      {/* Balance */}
      <div className={tw("flex", "items-center")}>
        <span className={tw("text-2xl", "mr-2")}>{balance}</span>
        <ElementIcon size={IconSize.MEDIUM} />
      </div>

      {/* Label */}
      <div className={tw("flex", "items-center")}>
        <span className={tw("text-xl", "mr-2", "mb-1")}>{label}</span>
        {tooltip ? (
          <Tooltip
            arrow
            placement="top"
            open={showTooltip}
            title={t`${tooltip}`}
          >
            <button
              className={tw("h-5")}
              onMouseEnter={enableTooltip}
              onMouseLeave={disableTooltip}
            >
              {tooltipIcon}
            </button>
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
}
