import {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  createRef,
  RefObject,
} from "react";
import { t } from "ttag";
import H2 from "src/ui/base/H2/H2";
import DelegateProfileRow from "src/ui/delegate/DelegatesList/DelegateProfileRow";
import { delegates } from "src/elf-council-delegates/delegates";
import shuffle from "lodash.shuffle";

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
  const scrollRefs = useRef<RefObject<HTMLLIElement>[]>([]);

  scrollRefs.current = [...delegates].map((_, i) => {
    return scrollRefs.current[i] ?? createRef();
  });

  // shuffle the delegates list on first render to prevent biases
  const shuffledDelegates = useMemo(() => {
    return shuffle(delegates);
  }, []);

  useEffect(() => {
    const verifiedDelegateIdx = shuffledDelegates.findIndex((delegate) => {
      return delegate.address === selectedDelegate;
    });

    if (verifiedDelegateIdx !== -1) {
      scrollRefs.current[verifiedDelegateIdx].current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedDelegate, shuffledDelegates]);

  return (
    <div className="relative mb-8">
      <H2 className="mb-4 text-2xl text-principalRoyalBlue tracking-wide">{t`Explore Featured Delegates`}</H2>

      {/* List of delegates */}
      <div>
        {/* Header */}
        <div className="grid grid-cols-7 border-b-2 pb-2 mb-4 font-bold text-principalRoyalBlue">
          <span className="col-span-4 ml-4">{t`Name`}</span>
          <div className="col-span-1 ml-auto mr-14">
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

              if (delegate.address === account) {
                setIsSelfDelegated(true);
              } else {
                setIsSelfDelegated(false);
              }
            };

            // TODO: Remove -${idx} for production since addresses are always unique
            return (
              <li
                key={`${delegate.address}-${idx}}`}
                ref={scrollRefs.current[idx]}
              >
                <DelegateProfileRow
                  account={account}
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
