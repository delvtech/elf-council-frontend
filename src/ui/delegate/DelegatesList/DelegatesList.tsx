import { ReactElement } from "react";
import { t } from "ttag";
import H2 from "src/ui/base/H2/H2";
import DelegateProfile from "src/ui/delegate/DelegatesList/DelegateProfile";
import { delegates } from "src/elf-council-delegates/delegates";

interface DelegatesListProps {
  selectedDelegate: string;
  setDelegateAddressInput: (address: string) => void;
  setIsSelfDelegated: (state: boolean) => void;
}

function DelegatesList({
  selectedDelegate,
  setDelegateAddressInput,
  setIsSelfDelegated,
}: DelegatesListProps): ReactElement {
  return (
    <div className="relative mb-8">
      <H2 className="mb-4 text-2xl text-principalRoyalBlue tracking-wide">{t`Explore Featured Delegates`}</H2>

      {/* List of delegates */}
      <ul
        className="grid pr-1 grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 overflow-y-scroll"
        // 428px exactly matches 5 rows of the list
        style={{ maxHeight: "428px" }}
      >
        {delegates.map((delegate, idx) => {
          const handleSelectDelegate = () => {
            setDelegateAddressInput(delegate.address);
            setIsSelfDelegated(false);
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
  );
}

export default DelegatesList;
