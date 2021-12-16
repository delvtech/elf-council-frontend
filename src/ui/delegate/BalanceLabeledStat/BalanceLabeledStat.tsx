import { ReactElement, useState, MouseEvent } from "react";
import { Tooltip } from "@material-ui/core";
import classNames from "classnames";
import tw from "src/elf-tailwindcss-classnames";
import Image from "next/image";
import { t } from "ttag";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

interface BalanceLabeledStatProps {
  className?: string;
  tooltip?: string;
  helperText?: ReactElement;
  label: string;
  balance: string;
}

export function BalanceLabeledStat(
  props: BalanceLabeledStatProps
): ReactElement {
  const { className, tooltip, helperText, label, balance } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const enableTooltip = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowTooltip(true);
  };
  const disableTooltip = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  return (
    <div className={classNames(tw("text-white"), className)}>
      {/* Balance */}
      <div className={tw("flex", "items-center")}>
        <span className={tw("text-2xl", "mr-2")}>{balance}</span>
        <div
          className={tw(
            "grid",
            "place-items-center",
            "w-7",
            "h-7",
            "bg-paleLily",
            "rounded-full"
          )}
        >
          <div className={tw("relative", "h-5", "w-5")}>
            <Image
              layout="fill"
              src="/assets/ElementLogo--dark.svg"
              alt={t`Element logo`}
            />
          </div>
        </div>
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
              <ExclamationCircleIcon className={tw("h-5")} />
            </button>
          </Tooltip>
        ) : null}
      </div>

      {/* Helper Text */}
      <div>
        <span className={tw("text-sm", "leading-4")}>{helperText}</span>
      </div>
    </div>
  );
}
