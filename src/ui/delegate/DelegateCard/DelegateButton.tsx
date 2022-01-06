import { ReactElement } from "react";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { t } from "ttag";
import classNames from "classnames";

import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";

interface DelegateButtonProps {
  account: string | null | undefined;
  delegateAddressInput: string;
  onDelegateClick: () => void;
  invalidAddress: boolean;
  isLoading?: boolean;
  buttonVariant?: ButtonVariant;
  buttonClassName?: string;
}

function DelegateButton(props: DelegateButtonProps): ReactElement {
  const {
    account,
    delegateAddressInput,
    onDelegateClick,
    invalidAddress,
    isLoading = false,
    buttonVariant = ButtonVariant.PRIMARY,
    buttonClassName = "",
  } = props;

  const noAccount = !account;
  const noInput = delegateAddressInput.length === 0;

  return (
    <Tooltip content={getTooltipContent(noAccount, noInput, invalidAddress)}>
      <Button
        loading={isLoading}
        onClick={onDelegateClick}
        variant={buttonVariant}
        className={classNames("w-full", buttonClassName)}
        disabled={noAccount || isLoading || noInput || invalidAddress}
      >{t`Delegate`}</Button>
    </Tooltip>
  );
}

function getTooltipContent(
  noAccount: boolean,
  noInput: boolean,
  invalidAddress: boolean,
): string {
  if (noAccount) {
    return t`Connect wallet`;
  }

  if (noInput) {
    return t`Enter an address`;
  }

  if (invalidAddress) {
    return t`Enter a valid address`;
  }

  return "";
}

export default DelegateButton;
