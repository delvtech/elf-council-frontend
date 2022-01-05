import React, { ReactElement } from "react";
import { isValidAddress } from "src/base/isValidAddress";
import { width } from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { t } from "ttag";
import Tooltip from "src/ui/base/Tooltip/Tooltip";

interface ClaimAndDelegateButtonProps {
  account: string | null | undefined;
  balance: string;
  isDelegated: boolean;
  delegateAddress: string;

  isLoading?: boolean;
  onClaimAndDelegate: () => void;
}
export function ClaimAndDelegateButton(
  props: ClaimAndDelegateButtonProps,
): ReactElement {
  const {
    account,
    balance,
    isDelegated,
    delegateAddress,
    isLoading,
    onClaimAndDelegate,
  } = props;

  const hasAnyBalance = !!Number(balance);
  const hasValidDelegateAddress =
    isDelegated || isValidAddress(delegateAddress);
  const tooltipContent = getTooltipContent(
    account,
    hasAnyBalance,
    hasValidDelegateAddress,
  );

  const disableWithoutError = !account || !hasAnyBalance || !delegateAddress;

  const error = disableWithoutError ? false : !hasValidDelegateAddress;

  return (
    <Tooltip content={tooltipContent}>
      <div>
        <Button
          loading={isLoading}
          error={error}
          disabled={
            !account || !hasAnyBalance || isLoading || !hasValidDelegateAddress
          }
          className={width("w-full")}
          onClick={onClaimAndDelegate}
        >
          <span className={width("w-full")}>{t`Claim and deposit`}</span>
        </Button>
      </div>
    </Tooltip>
  );
}
function getTooltipContent(
  account: string | null | undefined,
  hasAnyBalance: boolean,
  hasValidDelegateAddress: boolean,
): string {
  // disabled without error states
  if (!account) {
    return t`Connect wallet`;
  }

  if (!hasAnyBalance) {
    return t`No tokens to claim`;
  }

  // disabled with error states
  if (!hasValidDelegateAddress) {
    return t`Enter a valid address for your delegate`;
  }

  // not disabled, no error, so don't show tooltip
  return "";
}
