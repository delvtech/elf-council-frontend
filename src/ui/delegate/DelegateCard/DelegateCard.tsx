import { ReactElement, useCallback, useEffect } from "react";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import { t } from "ttag";
import CurrentDelegate from "src/ui/delegate/DelegateCard/CurrentDelegate";
import classNames from "classnames";
import DelegateAddressInput from "./DelegateAddressInput";
import DelegateButton from "./DelegateButton";
import { Overrides } from "ethers";

interface DelegateCardProps {
  account: string | null | undefined;
  changeDelegation: (arg: [newDelegate: string, overrides?: Overrides]) => void;
  isLoading: boolean;
  isSuccess: boolean;
  delegateAddressOnChain: string | undefined;
  delegateAddressInput: string;
  setDelegateAddressInput: (address: string) => void;
  selectedDelegate: string;
  setSelectedDelegate: (address: string) => void;
}

function DelegateCard(props: DelegateCardProps): ReactElement {
  const {
    account,
    changeDelegation,
    isLoading,
    isSuccess,
    delegateAddressInput,
    delegateAddressOnChain,
    setDelegateAddressInput,
    selectedDelegate,
    setSelectedDelegate,
  } = props;

  const handleDelegateClick = useCallback(() => {
    changeDelegation([selectedDelegate]);
  }, [changeDelegation, selectedDelegate]);

  // Updates the state after every click on 'Delegate' button
  useEffect(() => {
    if (isSuccess) {
      const nextDelegate = delegates.find(
        (d) => d.address === delegateAddressOnChain,
      );

      // Success
      if (nextDelegate || delegateAddressOnChain) {
        setSelectedDelegate("");
        setDelegateAddressInput("");
      }
    }
  }, [
    isSuccess,
    delegateAddressOnChain,
    setDelegateAddressInput,
    setSelectedDelegate,
  ]);

  const invalidAddress =
    !isValidAddress(delegateAddressInput) && delegateAddressInput.length !== 0;

  const isSelfDelegated = account ? account === delegateAddressOnChain : false;

  return (
    <div className={classNames({ "opacity-50": !account })}>
      <div className="flex flex-1 gap-7 text-xl text-white">
        <div className="w-full">
          <span>{t`Current delegation`}</span>
        </div>
        <div className="hidden w-full leading-5 md:hidden lg:block">
          <div>{t`Delegate to any address`}</div>
        </div>
      </div>

      <div className="mt-1 flex flex-col gap-0 md:flex-col md:gap-0 lg:flex-row lg:gap-7">
        {/* Current Delegate Profile */}
        {delegateAddressOnChain ? (
          <CurrentDelegate
            className="w-full md:w-full lg:w-1/2"
            currentDelegateAddress={delegateAddressOnChain}
            isSelfDelegated={isSelfDelegated}
          />
        ) : (
          <NoDelegate />
        )}

        <div className="mb-2 mt-8 block text-xl text-white md:block lg:hidden">
          <div className="w-full leading-5 ">
            <div className="block">{t`Delegate to any address`}</div>
          </div>
        </div>
        {/* Delegate Input */}
        <div className="flex w-full flex-col md:w-full lg:w-1/2">
          <DelegateAddressInput
            account={account}
            delegateAddressInput={delegateAddressInput}
            setDelegateAddressInput={setDelegateAddressInput}
            selectedDelegate={selectedDelegate}
            invalidAddress={invalidAddress}
          />

          <div className="text-center">
            <div className="flex items-end justify-end">
              <DelegateButton
                account={account}
                currentDelegateAddress={delegateAddressOnChain}
                selectedDelegate={selectedDelegate}
                onDelegateClick={handleDelegateClick}
                invalidAddress={invalidAddress}
                isLoading={isLoading}
                buttonVariant={ButtonVariant.GRADIENT}
                buttonClassName="w-28 justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoDelegate(): ReactElement {
  return (
    // 112px is the height CurrentDelegate; this is a placeholder for CurrentDelegate
    <div className="grid h-[112px] w-full place-items-center rounded-xl bg-white font-bold text-principalRoyalBlue md:w-full lg:w-1/2">
      <span>{t`No current delegation`}</span>
    </div>
  );
}

export default DelegateCard;
