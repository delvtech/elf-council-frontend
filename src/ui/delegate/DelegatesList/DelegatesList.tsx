import { ReactElement, useMemo } from "react";
import { t } from "ttag";
import H2 from "src/ui/base/H2/H2";
import DelegateProfile from "src/ui/delegate/DelegatesList/DelegateProfile";
import { delegates } from "src/elf-council-delegates/delegates";
import shuffle from "lodash.shuffle";
import { size } from "lodash";

interface DelegatesListProps {
  account: string | null | undefined;
  selectedDelegate: string;
  setDelegateAddressInput: (address: string) => void;
  setSelectedDelegate: (address: string) => void;
  setIsSelfDelegated: (state: boolean) => void;
}

function DelegatesList({
  account,
  selectedDelegate,
  setDelegateAddressInput,
  setSelectedDelegate,
  setIsSelfDelegated,
}: DelegatesListProps): ReactElement {
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
        <div className="flex border-b-2 pb-2 mb-4 font-bold text-principalRoyalBlue">
          <div className="ml-4">Name</div>
          <div className="flex ml-auto mr-14">
            <div>Votes</div>
            {/* Width of buttons is 205px + 16px to account for scrollbar width */}
            <span className={`w-[85px] lg:w-[220px]`} />
          </div>
        </div>

        {/* Delegates */}
        <ul
          // 392px exactly matches 5 rows of the list
          className="flex flex-col gap-y-2 overflow-y-scroll min-h-[392px] h-[40vh]"
        >
          {shuffledDelegates.map((delegate, idx) => {
            const handleSelectDelegate = () => {
              setSelectedDelegate(delegate.address);
              setDelegateAddressInput("");

              if (delegate.address === account) {
                setIsSelfDelegated(true);
              } else {
                setIsSelfDelegated(false);
              }
            };

            // TODO: Remove -${idx} for production since addresses are always unique
            return (
              <li key={`${delegate.address}-${idx}}`}>
                <DelegateProfile
                  selected={delegate.address === selectedDelegate}
                  delegate={delegate}
                  onSelectDelegate={handleSelectDelegate}
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
