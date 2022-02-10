import { ReactElement, useState, useCallback, useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import { t } from "ttag";
import CurrentDelegate from "src/ui/delegate/DelegateCard/CurrentDelegate";
import classNames from "classnames";
import DelegateAddressInput from "./DelegateAddressInput";
import DelegateButton from "./DelegateButton";
import { TWO_SECONDS_IN_MILLISECONDS } from "src/base/time";
import Button from "src/ui/base/Button/Button";
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";
import { Overrides } from "ethers";

interface DelegateCardProps {
  account: string | null | undefined;
  changeDelegation: (arg: [newDelegate: string, overrides?: Overrides]) => void;
  isLoading: boolean;
  isError: boolean;
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
    isError,
    isSuccess,
    delegateAddressInput,
    delegateAddressOnChain,
    setDelegateAddressInput,
    selectedDelegate,
    setSelectedDelegate,
  } = props;

  const [delegationSuccess, setDelegationSuccess] = useState(false);
  const [delegationFail, setDelegationFail] = useState(false);

  const isSelfDelegated = !!account
    ? account === delegateAddressOnChain
    : false;

  const handleDelegateClick = useCallback(() => {
    changeDelegation([selectedDelegate]);
  }, [changeDelegation, selectedDelegate]);

  const toggleDelegationSuccess = useCallback(() => {
    setDelegationSuccess(true);
    setTimeout(() => {
      setDelegationSuccess(false);
    }, TWO_SECONDS_IN_MILLISECONDS);
  }, []);

  const toggleDelegationFail = useCallback(() => {
    setDelegationFail(true);
    setTimeout(() => {
      setDelegationFail(false);
    }, TWO_SECONDS_IN_MILLISECONDS);
  }, []);

  const handleSelfDelegateClick = useCallback(() => {
    if (!account) {
      return;
    }

    changeDelegation([account]);
    setDelegateAddressInput("");
  }, [account, changeDelegation, setDelegateAddressInput]);

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
        toggleDelegationSuccess();
      }
      // Fail
    } else if (isError) {
      toggleDelegationFail();
    }
  }, [
    isSuccess,
    delegateAddressOnChain,
    setDelegateAddressInput,
    isError,
    setSelectedDelegate,
    toggleDelegationSuccess,
    toggleDelegationFail,
  ]);

  const invalidAddress =
    !isValidAddress(delegateAddressInput) && delegateAddressInput.length !== 0;

  return (
    <div className={classNames({ "opacity-50": !account })}>
      <div className="flex flex-1 gap-7 text-xl text-white">
        <div className="w-full">
          <span>{t`Current delegation`}</span>
        </div>
        <div className="hidden w-full leading-5 sm:block md:hidden lg:block">
          <div>{t`Delegate to any address`}</div>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-0 sm:flex-row sm:gap-7 md:flex-col md:gap-0 lg:flex-row lg:gap-7">
        {/* Current Delegate Profile */}
        {delegateAddressOnChain ? (
          <CurrentDelegate
            className="w-full sm:w-1/2 md:w-full lg:w-1/2"
            currentDelegateAddress={delegateAddressOnChain}
          />
        ) : (
          <NoDelegate />
        )}

        <div className="mb-2 mt-8 block text-xl text-white sm:hidden md:block lg:hidden">
          <div className="w-full leading-5 ">
            <div className="block">{t`Delegate to any address`}</div>
          </div>
        </div>
        {/* Delegate Input */}
        <div className="flex w-full flex-col sm:w-1/2 md:w-full lg:w-1/2">
          <DelegateAddressInput
            account={account}
            delegateAddressInput={delegateAddressInput}
            setDelegateAddressInput={setDelegateAddressInput}
            selectedDelegate={selectedDelegate}
            invalidAddress={invalidAddress}
            delegationSuccess={delegationSuccess}
            delegationFail={delegationFail}
          />

          <div className="text-center">
            <div className="flex items-end justify-end">
              <div className="mr-4">
                {!isSelfDelegated ? (
                  <Button
                    onClick={handleSelfDelegateClick}
                    variant={ButtonVariant.GRADIENT}
                    disabled={!account || isLoading}
                    loading={isLoading}
                    className="w-36"
                  >
                    {t`Self-delegate`}
                  </Button>
                ) : (
                  <Tag intent={Intent.SUCCESS}>
                    <CheckCircleIcon height={24} className="mr-2" />
                    <span className="font-bold">{t`Self-delegated!`}</span>
                  </Tag>
                )}
              </div>

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
    <div className="grid h-[112px] w-full place-items-center rounded-md bg-white font-bold text-principalRoyalBlue sm:w-1/2 md:w-full lg:w-1/2">
      <span>{t`No current delegation`}</span>
    </div>
  );
}

export default DelegateCard;
