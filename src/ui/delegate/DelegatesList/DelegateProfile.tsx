import { Fragment, ReactElement, useState, useCallback, useRef } from "react";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { t } from "ttag";
import { AnnotationIcon } from "@heroicons/react/solid";
import { Delegate } from "src/elf-council-delegates/delegates";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { copyToClipboard } from "src/base/copyToClipboard";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon/WalletJazzicon";
import Image from "next/image";
import classNames from "classnames";
import { ONE_SECOND_IN_MILLISECONDS } from "src/base/time";
import { Popover, Transition } from "@headlessui/react";
import DetailedDelegateProfile from "src/ui/delegate/DelegatesList/DetailedDelegateProfile";

interface DelegateProfileProps {
  selected: boolean;
  delegate: Delegate;
  onChooseDelegate?: (address: string) => void;
  active?: boolean;
}

const defaultTooltipState = {
  twitterHandle: false,
  address: false,
};

function DelegateProfile(props: DelegateProfileProps): ReactElement {
  const { selected = false, delegate, onChooseDelegate } = props;
  const [showTooltip, setShowTooltip] = useState(defaultTooltipState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopy = useCallback(
    (type: "twitterHandle" | "address") => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const nextState = { ...defaultTooltipState };
      nextState[type] = true;
      setShowTooltip(nextState);
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(defaultTooltipState);
        timeoutRef.current = null;
      }, ONE_SECOND_IN_MILLISECONDS);
      copyToClipboard(delegate[type]);
    },
    [delegate],
  );

  const onCopyTwitterHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy("twitterHandle");
  };

  const onCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy("address");
  };

  return (
    <Popover>
      <Popover.Button className="w-full">
        <div
          className={classNames(
            "flex items-center justify-between py-3 px-4 bg-hackerSky rounded-xl",
            { "!bg-paleLily": selected },
          )}
        >
          <div className="items-start w-10/12 text-left truncate">
            <div className="flex items-center mb-1 font-bold text-principalRoyalBlue">
              <WalletJazzicon
                account={delegate.address}
                size={20}
                className="inline-block h-5 w-5 rounded-xl bg-principalRoyalBlue mr-1.5"
              />
              <span className="truncate">{delegate.name}</span>
            </div>
            <span className="text-blueGrey">
              <NumDelegatedVotes account={delegate.address} />
            </span>
          </div>
          <div>
            <span className="flex flex-col items-center justify-center gap-1">
              <Tooltip
                className="!flex"
                isOpen={showTooltip.twitterHandle}
                content={t`Twitter handle copied`}
              >
                <button onClick={onCopyTwitterHandle}>
                  <AnnotationIcon className="h-5 text-principalRoyalBlue" />
                </button>
              </Tooltip>
              <Tooltip
                className="!flex relative w-4 h-4"
                isOpen={showTooltip.address}
                content={t`Address copied`}
              >
                <button onClick={onCopyAddress}>
                  <Image
                    layout="fill"
                    src="/assets/crown.svg"
                    alt={t`Crown icon`}
                  />
                </button>
              </Tooltip>
            </span>
          </div>
        </div>
      </Popover.Button>

      <Transition>
        {/* Greyed out background overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* z-30 in order to overlap sidebar z-index */}
          <Popover.Overlay className="fixed inset-0 z-30 transition-opacity bg-black bg-opacity-50" />
        </Transition.Child>

        {/* Detailed delegate profile */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Popover.Panel className="box-content absolute top-0 right-0 z-50 w-full h-full rounded-xl bg-hackerSky">
            {({ close }) => (
              <DetailedDelegateProfile
                delegate={delegate}
                onClose={close}
                onChooseDelegate={onChooseDelegate}
              />
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition>
    </Popover>
  );
}

interface NumDelegatedVotesProps {
  account: string;
}
function NumDelegatedVotes(props: NumDelegatedVotesProps): ReactElement {
  const { account } = props;
  const votePower = useVotingPowerForAccount(account);
  return <span>{t`${votePower} votes`}</span>;
}

export default DelegateProfile;
