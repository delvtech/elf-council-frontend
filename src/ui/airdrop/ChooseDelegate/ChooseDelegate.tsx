import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
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
      nextStepLabel={t`Review Claim`}
      onPrevStep={onPrevStep}
    >
      <div className="text-left text-2xl font-bold mb-10">{t`Choose a delegate`}</div>
      <div className="flex flex-col w-full justify-center text-base mb-10">
        <span
          className={"w-full mb-4"}
        >{t`Select a community member to represent you in our governance system.
        You can change this delegation at any time. If you want to learn more
        about potential delegates, click on the x icon to learn more about them
        or click on the y icon to view their Twitter.`}</span>
        <span className="w-full font-bold mb-2">{t`You can delegate to someone
        not listed or to yourself, by entering an Ethereum address.`}</span>
      </div>
      <div className="space-y-4">
        <TextInput
          screenReaderLabel={t`Enter delegate address`}
          id={"delegate-address"}
          name={t`Enter delegate address`}
          placeholder={t`Enter delegate address`}
          className="mb-4 h-12 text-left text-principalRoyalBlue placeholder-principalRoyalBlue"
          value={delegateAddress}
          onChange={(event) => setDelegateAddress(event.target.value)}
        />
        <div className="p-1 rounded-xl shadow h-48 overflow-auto">
          {/* List of delegates */}
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 overflow-y-scroll max-h-[428px]">
            {delegates.map((delegate, idx) => {
              return (
                <li key={`${delegate.address}-${idx}}`}>
                  <button
                    className="w-full text-left"
                    onClick={() => {
                      setSelectedDelegateIndex(idx);
                      setDelegateAddress(delegate.address);
                    }}
                  >
                    <DelegateProfile
                      selected={idx === selectedDelegateIndex}
                      delegate={delegate}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </StepCard>
  );
}
