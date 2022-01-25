import { CheckCircleIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H2 from "src/ui/base/H2";
import TextInput from "src/ui/base/Input/TextInput";
import { Tag, Intent } from "src/ui/base/Tag/Tag";
import DelegateProfile from "src/ui/delegate/DelegatesList/DelegateProfile";
import { t } from "ttag";

interface ChooseDelegateProps {
  account: string;
  onChooseDelegate: (delegateAddress: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export function ChooseDelegate({
  account,
  onNextStep: onNextStepFromProps,
  onChooseDelegate,
  onPrevStep,
}: ChooseDelegateProps): ReactElement {
  const [delegateAddress, setDelegateAddress] = useState<string | undefined>();

  const [selectedDelegateIndex, setSelectedDelegateIndex] = useState<
    number | undefined
  >();

  // Unset the selected featured delegate if the user changes the text input
  useEffect(() => {
    if (selectedDelegateIndex === undefined) {
      return;
    }
    if (delegates[selectedDelegateIndex].address !== delegateAddress) {
      setSelectedDelegateIndex(undefined);
    }
  }, [delegateAddress, selectedDelegateIndex]);

  const onNextStep = useCallback(() => {
    onChooseDelegate(
      // safe to cast because we disable the button when the delegateAddress is invalid
      delegateAddress as string,
    );
    onNextStepFromProps();
  }, [delegateAddress, onChooseDelegate, onNextStepFromProps]);

  return (
    <StepCard
      // relative so the delegate profile popover stays contained within the card
      className="relative"
      onNextStep={onNextStep}
      nextStepDisabled={!isValidAddress(delegateAddress || "")}
      nextStepLabel={t`Review deposit`}
      onPrevStep={onPrevStep}
    >
      {/* {isValidAddress(delegateAddress || "") ? (
        <div className={classNames("text-right mb-8")}>
          <Tag intent={Intent.SUCCESS}>
            <span className="font-bold">{t`Delegation valid: ${delegateAddress}`}</span>
            <CheckCircleIcon height={24} className="ml-4" />
          </Tag>
        </div>
      ) : null} */}
      <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
        <H2>{t`Choose a delegate from the list below`}</H2>
        <div className="space-y-8">
          <div className="pr-1 overflow-auto shadow h-72 rounded-xl">
            {/* List of delegates */}
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
              {delegates.map((delegate, idx) => {
                const handleSelectDelegate = () => {
                  setSelectedDelegateIndex(idx);
                  setDelegateAddress(delegate.address);
                };

                return (
                  <li key={`${delegate.address}-${idx}}`}>
                    <DelegateProfile
                      selected={idx === selectedDelegateIndex}
                      delegate={delegate}
                      onSelectDelegate={handleSelectDelegate}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex w-11/12">
            <div className="flex flex-col flex-1 space-y-2">
              <H2 className="text-center">{t`or`}</H2>
              <div className="flex items-center justify-center space-x-4">
                {delegateAddress !== account ? (
                  <Button
                    onClick={() => {
                      setDelegateAddress(account);
                      onChooseDelegate(account);
                    }}
                    variant={ButtonVariant.OUTLINE_WHITE}
                  >
                    {t`Self-delegate`}
                  </Button>
                ) : (
                  <div className={classNames("text-right mb-8")}>
                    <Tag intent={Intent.SUCCESS}>
                      <CheckCircleIcon height={24} className="mr-2" />
                      <span className="font-bold">{t`Self-delegated!`}</span>
                    </Tag>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-1 space-y-2">
              <H2 className="text-center">{t`or enter an address`}</H2>
              <div className="flex space-x-4 ">
                <TextInput
                  screenReaderLabel={t`Enter delegate address`}
                  id={"delegate-address"}
                  name={t`Enter delegate address`}
                  placeholder={t`Enter delegate address`}
                  containerClassName="flex-1"
                  className="flex-1 h-12 mb-4 text-left text-principalRoyalBlue placeholder-principalRoyalBlue"
                  value={delegateAddress}
                  onChange={(event) => setDelegateAddress(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StepCard>
  );
}
