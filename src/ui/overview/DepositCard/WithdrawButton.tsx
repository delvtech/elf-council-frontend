import React, { ReactElement } from "react";
import { Tooltip } from "@material-ui/core";
import { FixedNumber } from "ethers";
import tw, { width } from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";
import classNames from "classnames";

interface WithdrawButtonProps {
  account: string | null | undefined;
  amountDeposited: string;
  withdrawAmount: string;
  onWithdraw: () => void;
  isLoading?: boolean;
  buttonVariant?: ButtonVariant;
  buttonClassName?: string;
}
export function WithdrawButton(props: WithdrawButtonProps): ReactElement {
  const {
    account,
    amountDeposited,
    withdrawAmount,
    onWithdraw,
    isLoading = false,
    buttonVariant = ButtonVariant.PRIMARY,
    buttonClassName = "",
  } = props;
  const hasWithdrawAmount = !!Number(withdrawAmount);
  const hasAnyDeposited = !!Number(amountDeposited);
  const hasEnoughDeposited = !FixedNumber.from(amountDeposited || "0")
    .subUnsafe(FixedNumber.from(withdrawAmount || "0"))
    .isNegative();

  const tooltipTitle = getTooltipTitle(
    account,
    hasAnyDeposited,
    hasWithdrawAmount,
    hasEnoughDeposited,
  );

  return (
    <Tooltip
      id="withdraw-button-tooltip"
      arrow
      title={tooltipTitle}
      placement="top"
    >
      <div>
        <Button
          loading={isLoading}
          error={!hasEnoughDeposited}
          disabled={
            isLoading || !hasEnoughDeposited || !account || !hasWithdrawAmount
          }
          className={classNames("w-full", buttonClassName)}
          onClick={onWithdraw}
          variant={buttonVariant}
        >
          <span className="w-full">{t`Withdraw`}</span>
        </Button>
      </div>
    </Tooltip>
  );
}
function getTooltipTitle(
  account: string | null | undefined,
  hasAnyDeposited: boolean,
  hasWithdrawAmount: boolean,
  hasEnoughDeposited: boolean,
): string {
  if (!account) {
    return t`Connect wallet`;
  }

  if (!hasAnyDeposited) {
    return t`No tokens to withdraw`;
  }

  if (!hasWithdrawAmount) {
    return t`Enter withdrawal amount`;
  }

  if (!hasEnoughDeposited) {
    return t`Not enough tokens`;
  }
  return "";
}
