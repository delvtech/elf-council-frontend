import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import TextInput from "src/ui/base/Input/TextInput";
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import DelegateProfileRow from "src/ui/delegate/DelegatesList/DelegateProfileRow";
import H2 from "src/ui/base/H2/H2";
import { InputValidationIcon } from "src/ui/base/InputValidationIcon";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { t } from "ttag";
import shuffle from "lodash.shuffle";
import classNames from "classnames";

interface DelegateCardProps {
  account: string;
  className?: string;
  onComplete?: (address: string) => void;
  onBackClick?: () => void;
  onNextClick?: () => void;
}

export default function DelegateCard({
  account,
  className,
  onComplete,
  onBackClick,
  onNextClick,
}: DelegateCardProps): ReactElement {
  const [selectedAddress, setSelectedAddress] = useState<string>();
  const [customAddress, setCustomAddress] = useState<string>();

  const isValidSelectedAddress =
    !!selectedAddress && isValidAddress(selectedAddress);
  const isValidCustomAddress = !!customAddress && isValidAddress(customAddress);

  useEffect(() => {
    if (customAddress) {
      setSelectedAddress(customAddress);
    }
  }, [customAddress]);

  useEffect(() => {
    if (isValidSelectedAddress) {
      onComplete?.(selectedAddress);
    }
  }, [isValidSelectedAddress, selectedAddress, onComplete]);

  const scrollRef = useCallback((node: HTMLLIElement) => {
    node?.scrollIntoView();
  }, []);

  const handleAddressChange = (address: string) => {
    setSelectedAddress(address);
    setCustomAddress("");
  };

  // shuffle the delegates list on first render to prevent biases
  const shuffledDelegates = useMemo(() => shuffle(delegates), []);

  return (
    <Card
      variant={CardVariant.BLUE}
      className={classNames("relative", className)}
    >
      <div className="p-2 text-white sm:px-6 sm:py-4">
        <h1 className="mb-2 text-2xl font-semibold">{t`Choose a delegate`}</h1>
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
            {shuffledDelegates.map((delegate) => {
              const handleChoose = () => handleAddressChange(delegate.address);
              const isSelected = selectedAddress === delegate.address;
              return (
                <li
                  key={delegate.address}
                  ref={isSelected ? scrollRef : undefined}
                >
                  <DelegateProfileRow
                    selected={isSelected}
                    highlightSelected
                    delegate={delegate}
                    actionButton={
                      <Button
                        onClick={handleChoose}
                        variant={ButtonVariant.PRIMARY}
                        disabled={isSelected}
                        className="hidden w-full justify-center lg:inline-flex"
                      >
                        {t`Choose`}
                      </Button>
                    }
                    profileActionButton={
                      <Button
                        onClick={handleChoose}
                        variant={ButtonVariant.PRIMARY}
                        disabled={isSelected}
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
              {account && account === selectedAddress ? (
                <div className={classNames("text-right")}>
                  <Tag intent={Intent.SUCCESS}>
                    <CheckCircleIcon height={24} className="mr-2" />
                    <span className="font-bold">{t`Self-delegated!`}</span>
                  </Tag>
                </div>
              ) : (
                <Button
                  onClick={() => handleAddressChange(account)}
                  variant={ButtonVariant.OUTLINE_WHITE}
                >
                  {t`Self-delegate`}
                </Button>
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
                error={!!customAddress && !isValidCustomAddress}
                containerClassName="flex-1"
                className={classNames(
                  "mb-4 h-12 flex-1 text-left text-principalRoyalBlue placeholder-principalRoyalBlue",
                  {
                    "pr-12": isValidCustomAddress,
                  },
                )}
                value={customAddress}
                onChange={({ target }) => setCustomAddress(target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 bottom-4 flex items-center pr-3">
                {customAddress ? (
                  <InputValidationIcon
                    isValid={isValidCustomAddress}
                    invalidToolipContent={t`Invalid address`}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between gap-2 text-right">
          {onBackClick && (
            <Button
              className="px-12"
              variant={ButtonVariant.WHITE}
              onClick={onBackClick}
            >
              {t`Back`}
            </Button>
          )}
          {onNextClick && (
            <Button
              className="px-12"
              variant={ButtonVariant.GRADIENT}
              disabled={!isValidSelectedAddress}
              onClick={onNextClick}
            >
              {t`Review Transaction`}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
