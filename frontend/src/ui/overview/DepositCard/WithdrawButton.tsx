import React, { ReactElement } from "react";
import { Tooltip } from "@material-ui/core";
import { FixedNumber } from "ethers";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { t } from "ttag";

interface WithdrawButtonProps {
  account: string | null | undefined;
  amountDeposited: string;
  withdrawAmount: string;
  onWithdraw: () => void;
}
export function WithdrawButton(props: WithdrawButtonProps): ReactElement {
  const { account, amountDeposited, withdrawAmount, onWithdraw } = props;
  const hasWithdrawAmount = !!Number(withdrawAmount);
  const hasEnoughDeposited = !FixedNumber.from(amountDeposited || "0")
    .subUnsafe(FixedNumber.from(withdrawAmount || "0"))
    .isNegative();

  let tooltipTitle = "";
  if (!account) {
    tooltipTitle = t`Connect wallet`;
  }

  if (!hasWithdrawAmount) {
    tooltipTitle = t`Enter withdrawal amount`;
  }

  if (!hasEnoughDeposited) {
    tooltipTitle = t`Not enough tokens`;
  }

  return (
    <Tooltip
      id="withdraw-button-tooltp"
      arrow
      title={tooltipTitle}
      placement="top"
    >
      <div>
        <Button
          error={!hasEnoughDeposited}
          disabled={!hasEnoughDeposited || !account || !hasWithdrawAmount}
          className={tw("w-full")}
          onClick={onWithdraw}
        >
          <span className={tw("w-full")}>{t`Withdraw`}</span>
        </Button>
      </div>
    </Tooltip>
  );
}
