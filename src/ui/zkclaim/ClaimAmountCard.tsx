import { ReactElement } from "react";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import { commify } from "ethers/lib/utils";
import { t } from "ttag";
import classNames from "classnames";

interface ClaimAmountCardProps {
  amount: number | string;
  label?: string;
  className?: string;
}

export default function ClaimAmountCard({
  amount,
  label = t`Claimable voting power`,
  className,
}: ClaimAmountCardProps): ReactElement {
  return (
    <div
      className={classNames(
        "min-w-full rounded-lg bg-white px-10 pt-16 pb-20 text-center shadow-[0_0_52px_rgba(143,216,231,.7)]",
        className,
      )}
    >
      <p className="mb-1 text-lg font-bold text-principalRoyalBlue text-opacity-60">
        {label}
      </p>
      <div className="flex items-center justify-center gap-3">
        <ElementIcon className="bg-paleLily" size={IconSize.LARGE} />
        <p className="text-5xl font-semibold text-principalRoyalBlue">
          {t`${commify(amount)} ELFI`}
        </p>
      </div>
    </div>
  );
}
