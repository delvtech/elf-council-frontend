import { ReactElement } from "react";
import { commify } from "ethers/lib/utils";
import { t } from "ttag";
import classNames from "classnames";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import useClaimableAmount from "./useClaimableAmount";

interface ClaimAmountCardProps {
  label?: string;
  className?: string;
}

export default function ClaimAmountCard({
  label = t`Claimable voting power`,
  className,
}: ClaimAmountCardProps): ReactElement {
  const claimableAmount = useClaimableAmount();
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
        <ElementIconCircle className="bg-paleLily" size={IconSize.LARGE} />
        <p className="text-5xl font-semibold text-principalRoyalBlue">
          {t`${commify(claimableAmount)} ELFI`}
        </p>
      </div>
    </div>
  );
}
