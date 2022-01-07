import React, { ReactElement } from "react";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { FixedNumber } from "ethers";
import { t } from "ttag";
import classNames from "classnames";

import { isValidAddress } from "src/base/isValidAddress";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";

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

  const tooltipContent = getTooltipContent(
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
    <Tooltip content={tooltipContent}>
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
          <span className="w-full">{t`Deposit`}</span>
        </Button>
      </div>
    </Tooltip>
  );
}
function getTooltipContent(
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
