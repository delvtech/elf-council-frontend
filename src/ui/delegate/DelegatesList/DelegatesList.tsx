import { ReactElement, useCallback, useMemo } from "react";
import { t } from "ttag";
import shuffle from "lodash.shuffle";
import H2 from "src/ui/base/H2/H2";
import DelegateProfileRow from "src/ui/delegate/DelegatesList/DelegateProfileRow";
import { delegates } from "src/elf-council-delegates/delegates";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { Overrides } from "ethers";
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
        <div className="grid grid-cols-7 px-4 items-center border-b-2 pb-2 mb-4 font-bold text-principalRoyalBlue">
          <span className="hidden lg:block col-span-5 lg:col-span-4">{t`Name`}</span>
          <span className="lg:hidden col-span-5 lg:col-span-4 ml-4">{t`Name / Votes`}</span>
          <div className="hidden lg:block col-span-1 ml-auto mr-14">
            <span>{t`Votes`}</span>
            {/* TODO: Instead of adding 15px for scrollbar width, determine that width based on browser */}
            {/* Spacer for buttons */}
          </div>
          <div className="col-span-2 place-self-end">
            <Button
              onClick={handleSelfDelegateClick}
              variant={ButtonVariant.GRADIENT}
              disabled={!account || isLoading || isSelfDelegated}
              loading={isLoading}
              className="w-36"
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
                    <Button
                      onClick={handleDelegation}
                      variant={ButtonVariant.GRADIENT}
                      disabled={!account || isLoading || currentlyDelegated}
                      className="hidden lg:inline-flex w-full justify-center"
                      loading={isLoading}
                    >
                      {t`Delegate`}
                    </Button>
                  }
                  profileActionButton={
                    <Button
                      onClick={handleDelegation}
                      variant={ButtonVariant.GRADIENT}
                      disabled={!account || isLoading || currentlyDelegated}
                      className="inline-flex w-full justify-center"
                      loading={isLoading}
                    >
                      {t`Delegate`}
                    </Button>
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

export default DelegatesList;
