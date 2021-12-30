import { ReactElement, useState } from "react";
import { delegates } from "src/elf-council-delegates/delegates";
import tw, {
  display,
  gridTemplateColumns,
  gap,
  overflow,
  margin,
  fontSize,
  textColor,
  letterSpacing,
} from "src/elf-tailwindcss-classnames";
import DelegateProfile from "src/ui/delegate/DelegatesList/DelegateProfile";
import H2 from "src/ui/base/H2";
import { t } from "ttag";
import DetailedDelegateProfile from "./DetailedDelegateProfile";

interface DelegatesListProps {
  selectedDelegate: string;
  setDelegateAddressInput: (address: string) => void;
}

function DelegatesList({
  selectedDelegate,
  setDelegateAddressInput,
}: DelegatesListProps): ReactElement {
  const [currentDelegate, setCurrentDelegate] = useState(-1);

  const onClose = () => {
    setCurrentDelegate(-1);
  };

  return (
    <div className="relative mb-8">
      <H2
        className={tw(
          margin("mb-4"),
          fontSize("text-2xl"),
          textColor("text-principalRoyalBlue"),
          letterSpacing("tracking-wide"),
        )}
      >{t`Explore Featured Delegates`}</H2>

      {/* List of delegates */}
      <ul
        className={tw(
          display("grid"),
          gridTemplateColumns("grid-cols-2", "lg:grid-cols-3"),
          gap("gap-x-4", "gap-y-3"),
          overflow("overflow-y-scroll"),
        )}
        // 428px exactly matches 5 rows of the list
        style={{ maxHeight: "428px" }}
      >
        {delegates.map((delegate, idx) => {
          const selected = delegate.address === selectedDelegate;

          return (
            // TODO: Remove -${idx} for production since addresses are always unique
            <li key={`${delegate.address}-${idx}}`}>
              <button
                className="w-full"
                onClick={() => setCurrentDelegate(idx)}
              >
                <DelegateProfile selected={selected} delegate={delegate} />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Detailed delegate profile */}
      {currentDelegate !== -1 ? (
        <DetailedDelegateProfile
          delegate={delegates[currentDelegate]}
          onClose={onClose}
          setDelegateAddressInput={setDelegateAddressInput}
        />
      ) : null}
    </div>
  );
}

export default DelegatesList;
