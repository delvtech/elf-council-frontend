import { ReactElement, useMemo } from "react";
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

  return (
    <div className="relative mb-8">
      <H2 className="mb-4 text-2xl tracking-wide text-principalRoyalBlue">{t`Explore Featured Delegates`}</H2>

      {/* List of delegates */}
      <div>
        {/* Header */}
        <div className="mb-4 grid grid-cols-7 border-b-2 pb-2 font-bold text-principalRoyalBlue">
          <span className="col-span-5 ml-4 hidden lg:col-span-4 lg:block">{t`Name`}</span>
          <span className="col-span-5 ml-4 lg:col-span-4 lg:hidden">{t`Name / Votes`}</span>
          <div className="col-span-1 ml-auto mr-14 hidden lg:block">
            <span>{t`Votes`}</span>
            {/* TODO: Instead of adding 15px for scrollbar width, determine that width based on browser */}
            {/* Spacer for buttons */}
            <span className="col-span-2" />
          </div>
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
                    <Button
                      onClick={handleDelegation}
                      variant={ButtonVariant.GRADIENT}
                      disabled={
                        selected || !account || isLoading || currentlyDelegated
                      }
                      className="hidden w-full justify-center lg:inline-flex"
                      loading={isLoading}
                    >
                      {t`Delegate`}
                    </Button>
                  }
                  profileActionButton={
                    <Button
                      onClick={handleDelegation}
                      variant={ButtonVariant.GRADIENT}
                      disabled={
                        selected || !account || isLoading || currentlyDelegated
                      }
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
