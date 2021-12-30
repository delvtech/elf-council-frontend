import React, { ReactElement } from "react";
import { Tooltip } from "@material-ui/core";
import { FixedNumber } from "ethers";
import { width } from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { t } from "ttag";
import { isValidAddress } from "src/base/isValidAddress";
import { ButtonVariant } from "src/ui/base/Button/styles";
import classNames from "classnames";

interface DepositButtonProps {
  account: string | null | undefined;
  allowance: string;
  balance: string;
  depositAmount: string;
  isDelegated: boolean;
  delegateAddress: string;
  onDeposit: () => void;
  isLoading?: boolean;
  buttonVariant?: ButtonVariant;
  buttonClassName?: string;
}
export function DepositButton(props: DepositButtonProps): ReactElement {
  const {
    allowance,
    account,
    balance,
    depositAmount,
    isDelegated,
    delegateAddress,
    onDeposit,
    isLoading = false,
    buttonVariant = ButtonVariant.PRIMARY,
    buttonClassName = "",
  } = props;
  const hasDepositAmount = !!Number(depositAmount);
  const hasAllowance = !!Number(allowance);
  const hasAnyBalance = !!Number(balance);
  const hasValidDelegateAddress =
    isDelegated || isValidAddress(delegateAddress);
  const hasEnoughBalance = !FixedNumber.from(balance || "0")
    .subUnsafe(FixedNumber.from(depositAmount || "0"))
    .isNegative();

  const tooltipTitle = getTooltipTitle(
    account,
    hasAllowance,
    hasAnyBalance,
    hasDepositAmount,
    hasEnoughBalance,
    hasValidDelegateAddress,
  );

  const disableWithoutError =
    !account ||
    !hasAllowance ||
    !hasAnyBalance ||
    (!delegateAddress && hasEnoughBalance);

  const error = disableWithoutError
    ? false
    : !hasEnoughBalance || !hasValidDelegateAddress;

  return (
    <Tooltip
      id="deposit-button-tooltp"
      arrow
      title={tooltipTitle}
      placement="top"
    >
      <div>
        <Button
          loading={isLoading}
          error={error}
          disabled={
            !account ||
            !hasAllowance ||
            !hasAnyBalance ||
            isLoading ||
            !hasEnoughBalance ||
            !hasDepositAmount ||
            !hasValidDelegateAddress
          }
          className={classNames("w-full", buttonClassName)}
          onClick={onDeposit}
          variant={buttonVariant}
        >
          <span className={width("w-full")}>{t`Deposit`}</span>
        </Button>
      </div>
    </Tooltip>
  );
}
function getTooltipTitle(
  account: string | null | undefined,
  hasAllowance: boolean,
  hasAnyBalance: boolean,
  hasDepositAmount: boolean,
  hasEnoughBalance: boolean,
  hasValidDelegateAddress: boolean,
): string {
  // disabled without error states
  if (!account) {
    return t`Connect wallet`;
  }

  if (!hasAllowance) {
    return t`Need allowance`;
  }

  if (!hasAnyBalance) {
    return t`No tokens to deposit`;
  }

  if (!hasDepositAmount) {
    return t`Enter a deposit amount`;
  }

  // disabled with error states
  if (!hasEnoughBalance) {
    return t`Not enough tokens`;
  }

  if (!hasValidDelegateAddress) {
    return t`Enter a valid address to delegate to`;
  }

  // not disabled, no error, so don't show tooltip
  return "";
}
