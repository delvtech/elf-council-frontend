import React, { ReactElement, useCallback, useMemo } from "react";
import { t } from "ttag";
import shuffle from "lodash.shuffle";
import H2 from "src/ui/base/H2/H2";
import DelegateProfileRow from "src/ui/delegate/DelegatesList/DelegateProfileRow";
import { delegates } from "src/elf-council-delegates/delegates";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { Overrides } from "ethers";
import classNames from "classnames";
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";

interface DelegatesListProps {
  account: string | null | undefined;
  changeDelegation: (arg: [newDelegate: string, overrides?: Overrides]) => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  delegateAddressOnChain: string | undefined;
  selectedDelegate: string;
  setDelegateAddressInput: (address: string) => void;
}

function DelegatesList({
  account,
  changeDelegation,
  isLoading,
  delegateAddressOnChain,
  selectedDelegate,
  setDelegateAddressInput,
}: DelegatesListProps): ReactElement {
  // shuffle the delegates list on first render to prevent biases
  const shuffledDelegates = useMemo(() => {
    return shuffle(delegates);
  }, []);

  const isSelfDelegated = !!account
    ? account === delegateAddressOnChain
    : false;

  const handleSelfDelegateClick = useCallback(() => {
    if (!account) {
      return;
    }

    changeDelegation([account]);
    setDelegateAddressInput("");
  }, [account, changeDelegation, setDelegateAddressInput]);

  return (
    <div className="relative mb-8">
      <H2 className="mb-4 text-2xl text-principalRoyalBlue tracking-wide">{t`Explore Featured Delegates`}</H2>

      {/* List of delegates */}
      <div>
        {/* Header */}
        <div className="grid grid-cols-10 px-4 items-center border-b-2 pb-2 mb-4 font-bold text-principalRoyalBlue">
          {/* Name */}
          <span className="hidden lg:block col-span-6 lg:col-span-4">{t`Name`}</span>
          {/* Name & Vote Power */}
          <span className="lg:hidden col-span-6 lg:col-span-4">{t`Name / Votes`}</span>

          {/* Vote Power */}
          <div className="hidden lg:block col-span-2 ml-auto mr-14">
            <span>{t`Votes`}</span>
          </div>

          {/* Buttons */}
          <div className="flex col-span-4 gap-x-4 mr-4">
            {/* Spacer for Profile Button */}
            <div className="hidden lg:block w-full" />
            <Button
              onClick={handleSelfDelegateClick}
              variant={ButtonVariant.GRADIENT}
              disabled={!account || isLoading || isSelfDelegated}
              loading={isLoading}
              className="w-full justify-center"
            >
              {t`Self-delegate`}
            </Button>
          </div>
        </div>

        {/* Delegates */}
        <ul
          // 392px exactly matches 5 rows of the list
          className="flex flex-col gap-y-2 pr-1 overflow-y-scroll min-h-[392px] h-[40vh]"
        >
          {shuffledDelegates.map((delegate, idx) => {
            const handleDelegation = () => {
              changeDelegation([delegate.address]);
              setDelegateAddressInput("");
            };

            const currentlyDelegated = delegateAddressOnChain
              ? delegate.address === delegateAddressOnChain
              : false;

            const selected = delegate.address === selectedDelegate;

            // TODO: Remove -${idx} for production since addresses are always unique
            return (
              <li key={`${delegate.address}-${idx}}`}>
                <DelegateProfileRow
                  account={account}
                  selected={selected}
                  delegate={delegate}
                  actionButton={
                    <ActionButton
                      tagClassName="hidden lg:block"
                      buttonClassName="hidden lg:inline-flex"
                      onDelegationClick={handleDelegation}
                      account={account}
                      isLoading={isLoading}
                      currentlyDelegated={currentlyDelegated}
                    />
                  }
                  profileActionButton={
                    <ActionButton
                      buttonClassName="inline-flex"
                      onDelegationClick={handleDelegation}
                      account={account}
                      isLoading={isLoading}
                      currentlyDelegated={currentlyDelegated}
                    />
                  }
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  tagClassName?: string;
  buttonClassName?: string;
  onDelegationClick: () => void;
  account: string | null | undefined;
  isLoading: boolean;
  currentlyDelegated: boolean;
}

function ActionButton({
  tagClassName = "",
  buttonClassName = "",
  onDelegationClick,
  account,
  isLoading,
  currentlyDelegated,
}: ActionButtonProps): ReactElement {
  return (
    <React.Fragment>
      {currentlyDelegated ? (
        <Tag
          intent={Intent.SUCCESS}
          className={classNames(tagClassName, "w-full shadow")}
        >
          <div className="font-bold text-center text-base">{t`Delegated`}</div>
        </Tag>
      ) : (
        <Button
          onClick={onDelegationClick}
          variant={ButtonVariant.GRADIENT}
          disabled={!account || isLoading || currentlyDelegated}
          className={classNames(buttonClassName, "w-full justify-center")}
          loading={isLoading}
        >
          {t`Delegate`}
        </Button>
      )}
    </React.Fragment>
  );
}

export default DelegatesList;
