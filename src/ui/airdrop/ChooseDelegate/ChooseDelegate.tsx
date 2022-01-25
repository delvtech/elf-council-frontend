import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H1 from "src/ui/base/H1";
import TextInput from "src/ui/base/Input/TextInput";
import DelegateProfile from "src/ui/delegate/DelegatesList/DelegateProfile";
import { t } from "ttag";

interface ChooseDelegateProps {
  onChooseDelegate: (delegateAddress: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export function ChooseDelegate({
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
      <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
        <H1>{t`Choose a delegate`}</H1>
        <div className="space-y-4">
          <div className="pr-1 overflow-auto shadow h-80 rounded-xl">
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
          <div className="flex flex-col">
            <span>{t`Or type in an address of your choice`}</span>
            <div className="flex space-x-4">
              <Button
                variant={ButtonVariant.OUTLINE_WHITE}
              >{t`Self-delegate`}</Button>
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
    </StepCard>
  );
}
