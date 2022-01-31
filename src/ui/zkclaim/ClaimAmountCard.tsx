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
    <div className="bg-white rounded-lg flex flex-col items-center justify-center pt-16 px-10 pb-14 mb-6 min-w-full shadow-[0_0_52px_rgba(143,216,231,.7)]">
      <ElementIcon
        size={IconSize.LARGE}
        className="mb-8 shadow-none"
        bgColorClassName="bg-paleLily"
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
