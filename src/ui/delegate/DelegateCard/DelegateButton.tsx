import { ReactElement } from "react";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { t } from "ttag";
import classNames from "classnames";
import { Delegate } from "src/elf-council-delegates/delegates";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import CurrentDelegate from "./CurrentDelegate";

interface DelegateButtonProps {
  account: string | null | undefined;
  currentDelegate: Delegate | undefined;
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
    currentDelegate,
    delegateAddressInput,
    onDelegateClick,
    invalidAddress,
    isLoading = false,
    buttonVariant = ButtonVariant.PRIMARY,
    buttonClassName = "",
  } = props;

  const noAccount = !account;
  const noInput = delegateAddressInput.length === 0;
  const sameDelegate = currentDelegate?.address === delegateAddressInput;

  return (
    <Tooltip
      content={getTooltipContent(
        noAccount,
        noInput,
        invalidAddress,
        sameDelegate,
      )}
    >
      <Button
        loading={isLoading}
        onClick={onDelegateClick}
        variant={buttonVariant}
        className={classNames("w-full", buttonClassName)}
        disabled={
          noAccount || isLoading || noInput || invalidAddress || sameDelegate
        }
      >{t`Delegate`}</Button>
    </Tooltip>
  );
}

function getTooltipContent(
  noAccount: boolean,
  noInput: boolean,
  invalidAddress: boolean,
  sameDelegate: boolean,
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

  if (sameDelegate) {
    return t`Delegate already delegated to`;
  }

  return "";
}

export default DelegateButton;
