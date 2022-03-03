import { ReactElement } from "react";
import classNames from "classnames";
import { t } from "ttag";
import TextInput from "src/ui/base/Input/TextInput";
import { InputValidationIcon } from "src/ui/base/InputValidationIcon";
interface DelegateAddressInputProps {
  account: string | null | undefined;
  delegateAddressInput: string;
  setDelegateAddressInput: (address: string) => void;
  selectedDelegate: string;
  invalidAddress: boolean;
}

function DelegateAddressInput(props: DelegateAddressInputProps): ReactElement {
  const {
    account,
    delegateAddressInput,
    setDelegateAddressInput,
    selectedDelegate,
    invalidAddress,
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

      {!!delegateAddressInput ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <InputValidationIcon
            isValid={!invalidAddress}
            invalidToolipContent={t`Invalid address`}
          />
        </div>
      ) : null}
    </div>
  );
}

export default DelegateAddressInput;
