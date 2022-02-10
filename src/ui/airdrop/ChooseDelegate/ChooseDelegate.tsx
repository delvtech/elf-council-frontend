import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H2 from "src/ui/base/H2/H2";
import TextInput from "src/ui/base/Input/TextInput";
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";
import DelegateProfileRow from "src/ui/delegate/DelegatesList/DelegateProfileRow";
import { t } from "ttag";
import shuffle from "lodash.shuffle";

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
  // Holds state for the Featured delegate selection
  const [selectedDelegateIndex, setSelectedDelegateIndex] = useState<
    number | undefined
  >();

  // Holds state for self-delegate option
  const [isSelfDelegated, setIsSelfDelegated] = useState(false);

  // Holds state for the custom delegate input
  const [customDelegateAddress, setCustomDelegateAddress] = useState<
    string | undefined
  >();

  // shuffle the delegates list on first render to prevent biases
  const shuffledDelegates = useMemo(() => {
    return shuffle(delegates);
  }, []);

  // disable the button when the user has no featured delegate, or
  // self-delegate, or valid custom address selected.
  const isValidCustomDelegateAddress =
    customDelegateAddress !== undefined &&
    isValidAddress(customDelegateAddress);

  const isNextStepDisabled =
    selectedDelegateIndex === undefined &&
    !isSelfDelegated &&
    !isValidCustomDelegateAddress;

  const onNextStep = useCallback(() => {
    if (isSelfDelegated) {
      onChooseDelegate(account);
    } else if (customDelegateAddress && isValidAddress(customDelegateAddress)) {
      onChooseDelegate(customDelegateAddress);
    } else if (
      selectedDelegateIndex !== undefined &&
      shuffledDelegates[selectedDelegateIndex].address
    ) {
      onChooseDelegate(shuffledDelegates[selectedDelegateIndex].address);
    }

    onNextStepFromProps();
  }, [
    account,
    customDelegateAddress,
    isSelfDelegated,
    onChooseDelegate,
    onNextStepFromProps,
    selectedDelegateIndex,
    shuffledDelegates,
  ]);

  const handleSelfDelegateButtonClick = useCallback(() => {
    setIsSelfDelegated(true);

    // Somewhat of a hack to clear all other selections when the
    // user self-delegates
    const indexOfAccountInDelegatesList = shuffledDelegates.findIndex(
      ({ address }) => address === account,
    );
    setSelectedDelegateIndex(
      indexOfAccountInDelegatesList === -1
        ? undefined
        : indexOfAccountInDelegatesList,
    );
    setCustomDelegateAddress("");
  }, [account, shuffledDelegates]);

  const handleCustomDelegateInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setCustomDelegateAddress(event.target.value);

      // Somewhat of a hack to clear all other selections when the
      // user provides a custom address
      const indexOfAccountInDelegatesList = shuffledDelegates.findIndex(
        ({ address }) => address === event.target.value,
      );

      setSelectedDelegateIndex(
        indexOfAccountInDelegatesList === -1
          ? undefined
          : indexOfAccountInDelegatesList,
      );
      if (account === event.target.value) {
        setIsSelfDelegated(true);
      } else {
        setIsSelfDelegated(false);
      }
    },
    [account, shuffledDelegates],
  );

  return (
    <StepCard
      // relative so the delegate profile popover stays contained within the card
      className="relative"
      onNextStep={onNextStep}
      nextStepDisabled={isNextStepDisabled}
      nextStepLabel={t`Review deposit`}
      onPrevStep={onPrevStep}
    >
      <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
        <H2>{t`Choose a delegate from the list below`}</H2>
        <div className="w-full">
          {/* Header */}
          <div className="grid grid-cols-7 border-b-2 pb-2 mb-4 font-bold text-white">
            <span className="hidden lg:block col-span-5 lg:col-span-4 ml-4">{t`Name`}</span>
            <span className="lg:hidden col-span-5 lg:col-span-4 ml-4">{t`Name / Votes`}</span>
            <div className="hidden lg:block col-span-1 ml-auto mr-14">
              <span>{t`Votes`}</span>
              {/* Spacer for buttons */}
              <span className={`col-span-2`} />
            </div>
          </div>

          <div className="pr-1 overflow-auto shadow min-h-[392px] h-[40vh]">
            {/* List of delegates */}
            <ul className="flex flex-col gap-y-2">
              {shuffledDelegates.map((delegate, idx) => {
                const handleSelectDelegate = () => {
                  setSelectedDelegateIndex(idx);

                  // Somewhat of a hack to clear all other selections when the
                  // user selects a featured delegate
                  setCustomDelegateAddress("");
                  if (account === delegate.address) {
                    setIsSelfDelegated(true);
                  } else {
                    setIsSelfDelegated(false);
                  }
                };

                const selected = idx === selectedDelegateIndex;

                return (
                  <li key={`${delegate.address}-${idx}}`}>
                    <DelegateProfileRow
                      account={account}
                      selected={selected}
                      highlightSelected
                      delegate={delegate}
                      actionButton={
                        <Button
                          onClick={handleSelectDelegate}
                          variant={ButtonVariant.PRIMARY}
                          disabled={selected}
                          className="hidden lg:inline-flex w-full justify-center"
                        >
                          {t`Choose`}
                        </Button>
                      }
                      profileActionButton={
                        <Button
                          onClick={handleSelectDelegate}
                          variant={ButtonVariant.PRIMARY}
                          disabled={selected}
                          className="inline-flex w-full justify-center"
                        >
                          {t`Choose Delegate`}
                        </Button>
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex px-4 mt-6">
            <div className="flex flex-col flex-1 space-y-2">
              <H2 className="text-center">{t`or`}</H2>
              <div className="flex items-center justify-center space-x-4">
                {!isSelfDelegated ? (
                  <Button
                    onClick={handleSelfDelegateButtonClick}
                    variant={ButtonVariant.OUTLINE_WHITE}
                  >
                    {t`Self-delegate`}
                  </Button>
                ) : (
                  <div className={classNames("text-right")}>
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
              <div className="relative flex items-center justify-center space-x-4">
                <TextInput
                  screenReaderLabel={t`Enter delegate address`}
                  id={"delegate-address"}
                  name={t`Enter delegate address`}
                  placeholder={t`Enter delegate address`}
                  containerClassName="flex-1"
                  className={classNames(
                    "flex-1 h-12 mb-4 text-left text-principalRoyalBlue placeholder-principalRoyalBlue",
                    {
                      "pr-12": isValidCustomDelegateAddress,
                    },
                  )}
                  value={customDelegateAddress}
                  onChange={handleCustomDelegateInputChange}
                />
                {isValidCustomDelegateAddress ? (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none bottom-4">
                    <CheckCircleIcon className="w-8 h-8 text-statusGreen" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StepCard>
  );
}
