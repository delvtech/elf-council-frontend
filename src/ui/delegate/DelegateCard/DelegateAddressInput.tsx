import { ReactElement } from "react";
import classNames from "classnames";
import { t } from "ttag";
import {
  BadgeCheckIcon,
  CheckIcon,
  XIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";

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
    <div className="relative mb-4 rounded-md overflow-hidden">
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

      {!!selectedDelegate ? (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4">
          <CheckIcon className="fill-topaz h-6" />
        </div>
      ) : null}

      {delegationSuccess ? (
        <div className="flex absolute inset-0 bg-topaz items-center justify-center gap-2">
          <span className="text-white font-bold">{t`Delegation Successful`}</span>
          <BadgeCheckIcon className="fill-white h-6" />
        </div>
      ) : null}

      {delegationFail ? (
        <div className="flex absolute inset-0 bg-deepRed items-center justify-center gap-2">
          <span className="text-white font-bold">{t`Delegation Failed`}</span>
          <ExclamationCircleIcon className="fill-white h-6" />
        </div>
      ) : null}
    </div>
  );
}

export default DelegateAddressInput;
