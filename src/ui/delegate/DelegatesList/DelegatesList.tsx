import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  createRef,
  RefObject
} from "react";
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
  const scrollRefs = useRef<RefObject<HTMLLIElement>[]>([]);

  scrollRefs.current = delegates.map((_, i) => {
    return scrollRefs.current[i] ?? createRef();
  });

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
      <div className="mb-4 grid grid-cols-10 items-center pr-8">
        {/* Title */}
        <div className="col-span-7 lg:col-span-4">
          <H2 className="text-2xl tracking-wide text-principalRoyalBlue">
            <div className="hidden sm:block">{t`Explore Featured Delegates`}</div>
            <div className="leading-6 sm:hidden">
              <div>{t`Explore Featured`}</div>
              <div>{t`Delegates`}</div>
            </div>
          </H2>
        </div>

        {/* Vote Spacer */}
        <div className="col-span-2 ml-auto mr-14 hidden lg:block" />

        <div className="col-span-3 flex gap-x-4 lg:col-span-4">
          <div className="hidden w-full lg:block" />
          <div className="w-full">
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
      </div>

      {/* List of delegates */}
      <div>
        {/* Header */}
        <div className="mb-4 grid grid-cols-10 items-center border-b-2 px-4 pb-2 font-bold text-principalRoyalBlue">
          {/* Name */}
          <span className="col-span-7 hidden lg:col-span-4 lg:block">{t`Name`}</span>
          {/* Name & Vote Power */}
          <span className="col-span-7 lg:col-span-4 lg:hidden">{t`Name / Voting Power`}</span>

          {/* Vote Power */}
          <div className="col-span-2 ml-auto mr-14 hidden truncate lg:block">
            <span>{t`Voting Power`}</span>
          </div>

          {/* Spacer for Buttons */}
          <div className="col-span-3 mr-4 flex gap-x-4 lg:col-span-4" />
        </div>

        {/* Delegates */}
        <ul
          // 392px exactly matches 5 rows of the list
          className="flex h-[40vh] min-h-[392px] flex-col gap-y-2 overflow-y-scroll pr-1"
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
                    <ChangeDelegateButton
                      tagClassName="hidden lg:block"
                      buttonClassName="hidden lg:inline-flex"
                      onDelegationClick={handleDelegation}
                      account={account}
                      isLoading={isLoading}
                      currentlyDelegated={currentlyDelegated}
                    />
                  }
                  profileActionButton={
                    <ChangeDelegateButton
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

interface ChangeDelegateButtonProps {
  tagClassName?: string;
  buttonClassName?: string;
  onDelegationClick: () => void;
  account: string | null | undefined;
  isLoading: boolean;
  currentlyDelegated: boolean;
}

function ChangeDelegateButton({
  tagClassName = "",
  buttonClassName = "",
  onDelegationClick,
  account,
  isLoading,
  currentlyDelegated,
}: ChangeDelegateButtonProps): ReactElement {
  return (
    <React.Fragment>
      {currentlyDelegated ? (
        <Tag
          intent={Intent.SUCCESS}
          className={classNames(tagClassName, "w-full shadow")}
        >
          <div className="text-center text-base font-bold">{t`Delegated`}</div>
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
