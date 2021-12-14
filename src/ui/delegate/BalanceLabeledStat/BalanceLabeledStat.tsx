import { ReactElement, useState, useRef } from "react";
import { Tooltip } from "@material-ui/core";
import classNames from "classnames";
import tw from "src/elf-tailwindcss-classnames";
import Image from "next/image";
import { t } from "ttag";

interface BalanceLabeledStatProps {
  className?: string;
  tooltip?: string;
  tooltipTimeout?: number;
  helperText?: ReactElement;
  label: string;
  balance: string;
}

export function BalanceLabeledStat(
  props: BalanceLabeledStatProps
): ReactElement {
  const {
    className,
    tooltip,
    tooltipTimeout = 1000,
    helperText,
    label,
    balance,
  } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClickToolTip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setShowTooltip(false);
      return;
    }

    const time = tooltipTimeout < 1000 ? 1000 : tooltipTimeout;

    setShowTooltip(true);
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
      timeoutRef.current = null;
    }, time);
  };

  return (
    <div className={classNames(tw("text-white"), className)}>
      {/* Balance */}
      <div className={tw("flex", "items-center")}>
        <span className={tw("text-2xl", "mr-2")}>{balance}</span>
        <div
          className={tw(
            "grid",
            "items-center",
            "w-7",
            "h-7",
            "bg-paleLily",
            "rounded-full"
          )}
        >
          <Image
            height={20}
            width={20}
            src="/assets/ElementLogo--dark.svg"
            alt={t`Element logo`}
          />
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
            <button className={tw("h-5")} onClick={handleClickToolTip}>
              <Image
                height={20}
                width={20}
                src="/assets/exclamation-circle--thin.svg"
                alt={t`Tooltip icon`}
              />
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
