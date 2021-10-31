import React, { ReactElement } from "react";
import { isValidAddress } from "src/base/isValidAddress";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { t } from "ttag";
import { Tooltip } from "@material-ui/core";

interface ClaimAndDelegateButtonProps {
  account: string | null | undefined;
  balance: string;
  isDelegated: boolean;
  delegateAddress: string;

  isLoading?: boolean;
  onClaimAndDelegate: () => void;
}
export function ClaimAndDelegateButton(
  props: ClaimAndDelegateButtonProps
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
  const tooltipTitle = getTooltipTitle(
    account,
    hasAnyBalance,
    hasValidDelegateAddress
  );

  const disableWithoutError = !account || !hasAnyBalance || !delegateAddress;

  const error = disableWithoutError ? false : !hasValidDelegateAddress;

  return (
    <Tooltip
      id="claim-and-delegate-button-tooltp"
      arrow
      title={tooltipTitle}
      placement="top"
    >
      <div>
        <Button
          loading={isLoading}
          error={error}
          disabled={
            !account || !hasAnyBalance || isLoading || !hasValidDelegateAddress
          }
          className={tw("w-full")}
          onClick={onClaimAndDelegate}
        >
          <span className={tw("w-full")}>{t`Claim and deposit`}</span>
        </Button>
      </div>
    </Tooltip>
  );
}
function getTooltipTitle(
  account: string | null | undefined,
  hasAnyBalance: boolean,
  hasValidDelegateAddress: boolean
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
