import { ReactElement } from "react";
import classNames from "classnames";
import { t } from "ttag";
import {
  BadgeCheckIcon,
  CheckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";
import { isValidAddress } from "src/base/isValidAddress";
import TextInput from "src/ui/base/Input/TextInput";
interface DelegateAddressInputProps {
  account: string | null | undefined;
  delegateAddressInput: string;
  setDelegateAddressInput: (address: string) => void;
  selectedDelegate: string;
  invalidAddress: boolean;
  delegationSuccess: boolean;
  delegationFail: boolean;
}

function DelegateAddressInput(props: DelegateAddressInputProps): ReactElement {
  const {
    account,
    delegateAddressInput,
    setDelegateAddressInput,
    selectedDelegate,
    invalidAddress,
    delegationSuccess,
    delegationFail,
  } = props;

  return (
    <div className="relative mb-4 overflow-hidden rounded-md">
      <TextInput
        screenReaderLabel={t`Enter delegate address`}
        id={"delegate-address"}
        name={t`Enter delegate address`}
        placeholder={t`Enter delegate address`}
        className={classNames(
          "h-12 text-left text-principalRoyalBlue placeholder-principalRoyalBlue",
          { "pr-12": !!selectedDelegate },
        )}
        value={delegateAddressInput}
        onChange={(event) => setDelegateAddressInput(event.target.value)}
        disabled={!account}
        spellCheck={false}
        error={delegateAddressInput.length > 0 && invalidAddress}
        autoComplete="off"
      />

      {isValidAddress(delegateAddressInput) ? (
        <div className="absolute right-0 top-1/2 mr-4 -translate-y-1/2 transform">
          <CheckIcon className="h-6 fill-topaz" />
        </div>
      ) : null}

      {delegationSuccess ? (
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-topaz">
          <span className="font-bold text-white">{t`Delegation Successful`}</span>
          <BadgeCheckIcon className="h-6 fill-white" />
        </div>
      ) : null}

      {delegationFail ? (
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-deepRed">
          <span className="font-bold text-white">{t`Delegation Failed`}</span>
          <ExclamationCircleIcon className="h-6 fill-white" />
        </div>
      ) : null}
    </div>
  );
}

export default DelegateAddressInput;
