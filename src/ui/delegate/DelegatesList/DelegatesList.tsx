import { ReactElement, useMemo } from "react";
import { t } from "ttag";
import shuffle from "lodash.shuffle";
import { UseMutationResult } from "react-query";
import { ContractReceipt, Overrides } from "ethers";
import H2 from "src/ui/base/H2/H2";
import DelegateProfileRow from "src/ui/delegate/DelegatesList/DelegateProfileRow";
import { delegates } from "src/elf-council-delegates/delegates";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
interface DelegatesListProps {
  account: string | null | undefined;
  changeDelegationResult: UseMutationResult<
    ContractReceipt | undefined,
    unknown,
    [
      newDelegate: string,
      overrides?:
        | (Overrides & {
            from?: string | Promise<string> | undefined;
          })
        | undefined,
    ],
    unknown
  >;
  delegateAddressOnChain: string | undefined;
  selectedDelegate: string;
  setDelegateAddressInput: (address: string) => void;
  setSelectedDelegate: (address: string) => void;
}

function DelegatesList({
  account,
  changeDelegationResult,
  delegateAddressOnChain,
  selectedDelegate,
  setDelegateAddressInput,
  setSelectedDelegate,
}: DelegatesListProps): ReactElement {
  const {
    mutate: changeDelegation,
    isLoading,
    isError,
    isSuccess,
  } = changeDelegationResult;

  // shuffle the delegates list on first render to prevent biases
  const shuffledDelegates = useMemo(() => {
    return shuffle(delegates);
  }, []);

  return (
    <div className="relative mb-8">
      <H2 className="mb-4 text-2xl text-principalRoyalBlue tracking-wide">{t`Explore Featured Delegates`}</H2>

      {/* List of delegates */}
      <div>
        {/* Header */}
        <div className="grid grid-cols-7 border-b-2 pb-2 mb-4 font-bold text-principalRoyalBlue">
          <span className="hidden lg:block col-span-5 lg:col-span-4 ml-4">{t`Name`}</span>
          <span className="lg:hidden col-span-5 lg:col-span-4 ml-4">{t`Name / Votes`}</span>
          <div className="hidden lg:block col-span-1 ml-auto mr-14">
            <span>{t`Votes`}</span>
            {/* TODO: Instead of adding 15px for scrollbar width, determine that width based on browser */}
            {/* Spacer for buttons */}
            <span className="col-span-2" />
          </div>
        </div>

        {/* Delegates */}
        <ul
          // 392px exactly matches 5 rows of the list
          className="flex flex-col gap-y-2 pr-1 overflow-y-scroll min-h-[392px] h-[40vh]"
        >
          {shuffledDelegates.map((delegate, idx) => {
            const handleSelectDelegate = () => {
              setSelectedDelegate(delegate.address);
              setDelegateAddressInput("");
            };

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
                  onSelectDelegate={handleSelectDelegate}
                  actionButton={
                    <Button
                      onClick={handleDelegation}
                      variant={ButtonVariant.GRADIENT}
                      disabled={
                        selected || !account || isLoading || currentlyDelegated
                      }
                      className="hidden lg:inline-flex w-full justify-center"
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
