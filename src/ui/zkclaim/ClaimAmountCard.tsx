import { ReactElement } from "react";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import { t } from "ttag";

interface ClaimAmountCardProps {
  amount: number | string;
}

export default function ClaimAmountCard({
  amount,
}: ClaimAmountCardProps): ReactElement {
  const ElfiTokenAmountParts = amount.toString().split(".");
  return (
    <div className="mb-6 flex min-w-full flex-col items-center justify-center rounded-lg bg-white px-10 pt-16 pb-14 shadow-[0_0_52px_rgba(143,216,231,.7)]">
      <ElementIcon
        size={IconSize.LARGE}
        className="mb-8 bg-paleLily shadow-none"
      />
      <p className="text-3xl font-semibold text-blueGrey">
        <span className="text-principalRoyalBlue">
          {ElfiTokenAmountParts[0]}
        </span>
        .{ElfiTokenAmountParts[1]}
      </p>
      <p className="text-blueGrey">{t`$ELFI tokens`}</p>
    </div>
  );
}
