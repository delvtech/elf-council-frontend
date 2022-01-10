import { ReactElement } from "react";
import { t } from "ttag";
import H2 from "src/ui/base/H2";
import DelegateProfile from "src/ui/delegate/DelegatesList/DelegateProfile";
import { delegates } from "src/elf-council-delegates/delegates";

interface DelegatesListProps {
  account: string | null | undefined;
  selectedDelegate: string;
  setDelegateAddressInput: (address: string) => void;
}

function DelegatesList({
  account,
  selectedDelegate,
  setDelegateAddressInput,
}: DelegatesListProps): ReactElement {
  return (
    <div className="relative mb-8">
      <H2 className="mb-4 text-2xl text-principalRoyalBlue tracking-wide">{t`Explore Featured Delegates`}</H2>

      {/* List of delegates */}
      <ul
        className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 overflow-y-scroll"
        // 428px exactly matches 5 rows of the list
        style={{ maxHeight: "428px" }}
      >
        {delegates.map((delegate, idx) => (
          // TODO: Remove -${idx} for production since addresses are always unique
          <li key={`${delegate.address}-${idx}}`}>
            <button
              className="w-full text-left"
              onClick={() => {
                if (account) {
                  setDelegateAddressInput(delegate.address);
                }
              }}
            >
              <DelegateProfile
                selected={delegate.address === selectedDelegate}
                delegate={delegate}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DelegatesList;
