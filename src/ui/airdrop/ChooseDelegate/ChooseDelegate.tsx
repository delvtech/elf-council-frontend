import React, {
  ReactElement,
  useEffect,
  useCallback,
  useMemo,
  useState,
  useRef,
  createRef,
  RefObject,
} from "react";
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
  const scrollRefs = useRef<RefObject<HTMLLIElement>[]>([]);

  scrollRefs.current = delegates.map((_, i) => {
    return scrollRefs.current[i] ?? createRef();
  });

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

  useEffect(() => {
    if (
      selectedDelegateIndex &&
      selectedDelegateIndex !== -1 &&
      scrollRefs.current.length > 0
    ) {
      const delegateRef = scrollRefs.current[selectedDelegateIndex];
      delegateRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedDelegateIndex, shuffledDelegates]);

  return (
    <StepCard
      // relative so the delegate profile popover stays contained within the card
      className="relative"
      onNextStep={onNextStep}
      nextStepDisabled={isNextStepDisabled}
      nextStepLabel={t`Review transaction`}
      onPrevStep={onPrevStep}
    >
      <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
        <H2>{t`Choose a delegate from the list below`}</H2>
        <div className="w-full">
          {/* Header */}
          <div className="mb-4 grid grid-cols-10 border-b-2 pb-2 font-bold text-white">
            {/* Name */}
            <span className="col-span-7 ml-4 hidden lg:col-span-4 lg:block">{t`Name`}</span>
            <span className="col-span-7 ml-4 lg:col-span-4 lg:hidden">{t`Name / Voting Power`}</span>
            {/* Voting Power */}
            <div className="col-span-2 ml-auto mr-14 hidden truncate lg:block">
              <span>{t`Voting Power`}</span>
            </div>
            {/* Spacer for Buttons */}
            <span className="col-span-3 lg:col-span-4" />
          </div>

          <div className="h-[40vh] min-h-[392px] overflow-auto pr-1 shadow">
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
                  <li
                    key={`${delegate.address}-${idx}}`}
                    ref={scrollRefs.current[idx]}
                  >
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
                          className="hidden w-full justify-center lg:inline-flex"
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

          <div className="mt-6 flex px-4">
            <div className="flex flex-1 flex-col space-y-2">
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
            <div className="flex flex-1 flex-col space-y-2">
              <H2 className="text-center">{t`or enter an address`}</H2>
              <div className="relative flex items-center justify-center space-x-4">
                <TextInput
                  screenReaderLabel={t`Enter delegate address`}
                  id={"delegate-address"}
                  name={t`Enter delegate address`}
                  placeholder={t`Enter delegate address`}
                  containerClassName="flex-1"
                  className={classNames(
                    "mb-4 h-12 flex-1 text-left text-principalRoyalBlue placeholder-principalRoyalBlue",
                    {
                      "pr-12": isValidCustomDelegateAddress,
                    },
                  )}
                  value={customDelegateAddress}
                  onChange={handleCustomDelegateInputChange}
                />
                {isValidCustomDelegateAddress ? (
                  <div className="pointer-events-none absolute inset-y-0 right-0 bottom-4 flex items-center pr-3">
                    <CheckCircleIcon className="h-8 w-8 text-statusGreen" />
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
