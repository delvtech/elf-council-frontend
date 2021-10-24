import React, { ReactElement } from "react";
import { Tooltip } from "@material-ui/core";
import { FixedNumber } from "ethers";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { t } from "ttag";

interface DepositButtonProps {
  account: string | null | undefined;
  allowance: string;
  balance: string;
  depositAmount: string;
  onDeposit: () => void;
}
export function DepositButton(props: DepositButtonProps): ReactElement {
  const { allowance, account, balance, depositAmount, onDeposit } = props;
  const hasDepositAmount = !!Number(depositAmount);
  const hasAllowance = !!Number(allowance);
  const hasEnoughBalance = !FixedNumber.from(balance || "0")
    .subUnsafe(FixedNumber.from(depositAmount || "0"))
    .isNegative();

  let tooltipTitle = "";
  if (!account) {
    tooltipTitle = t`Connect wallet`;
  }

  if (!hasAllowance) {
    tooltipTitle = t`Need allowance`;
  }

  if (!hasDepositAmount) {
    tooltipTitle = t`Enter a deposit amount`;
  }

  if (!hasEnoughBalance) {
    tooltipTitle = t`Not enough tokens`;
  }

  return (
    <Tooltip
      id="deposit-button-tooltp"
      arrow
      title={tooltipTitle}
      placement="top"
    >
      <div>
        <Button
          error={!hasEnoughBalance}
          disabled={
            !hasEnoughBalance || !hasAllowance || !account || !hasDepositAmount
          }
          className={tw("w-full")}
          onClick={onDeposit}
        >
          <span className={tw("w-full")}>{t`Deposit`}</span>
        </Button>
      </div>
    </Tooltip>
  );
}
