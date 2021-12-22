import { ReactElement } from "react";

import classNames from "classnames";
import tw, {
  alignItems,
  display,
  fontSize,
  margin,
  textColor,
} from "src/elf-tailwindcss-classnames";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { InfoIconWithTooltip } from "src/ui/base/InfoIconWithTooltip";

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
  const { className, tooltip, tooltipHref, label, balance } = props;

  return (
    <div className={classNames(textColor("text-white"), className)}>
      {/* Balance */}
      <div className={tw(display("flex"), alignItems("items-center"))}>
        <span className={tw(fontSize("text-2xl"), margin("mr-2"))}>
          {balance}
        </span>
        <ElementIcon size={IconSize.MEDIUM} />
      </div>

      {/* Label */}
      <div className={tw(display("flex"), alignItems("items-center"))}>
        <span className={tw(fontSize("text-xl"), margin("mr-2", "mb-1"))}>
          {label}
        </span>
        {tooltip && (
          <InfoIconWithTooltip
            tooltipText={tooltip}
            tooltipHref={tooltipHref}
          />
        )}
      </div>
    </div>
  );
}
